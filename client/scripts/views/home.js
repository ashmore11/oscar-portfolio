import Posts from 'app/components/posts';

export default class Home {
  
  constructor() {

    this.$el    = $('#home');
    this.$tag   = this.$el.find('.tags li');
    this.$posts = this.$el.find('.posts li');

    this.postID = null;

    this.bindEvents();
    this.runIntroAnimation();

    this.posts = new Posts;
  
  }

  bindEvents() {

    this.$posts.on('mouseenter', this.mouseenter.bind(this));
    this.$posts.on('mouseleave', this.mouseleave.bind(this));

    this.$posts.on('click', this.loadPost.bind(this));
    this.$tag.on('click', this.filterPosts.bind(this));

  }

  unbind() {

    this.$posts.off('mouseenter');
    this.$posts.off('mouseleave');

    this.$posts.off('click');
    this.$tag.off('click');

  }

  runIntroAnimation() {

    this.$posts.each(function(index, item) {

      const params = {
        y: 0,
        opacity: 1,
        delay: index * 0.085,
        ease: Power3.easeOut
      };

      TM.to($(item), 1, params);

    });

  }

  mouseenter(event) {

    const target = $(event.currentTarget);
    const image  = target.find('img');
    const src    = image.data('over');

    target.find('img').attr('src', src);

    target.addClass('active');

  }

  mouseleave(event) {

    const target = $(event.currentTarget);
    const image  = target.find('img');
    const src    = image.data('out');

    target.find('img').attr('src', src);

    this.$posts.removeClass('active');

  }

  loadPost(event) {

    event.preventDefault();

    this.postClicked = true;

    const target = $(event.currentTarget);
    const id     = target.attr('id');
    const host   = window.location.origin;
    const apiUrl = `keystone/api/posts/${id}`;
    const post   = `${host}/${apiUrl}`;

    if(this.postID !== id) {

      this.posts.load(post);

      this.postID = id;

    }

    this.$posts.removeClass('open');
    
    target.addClass('open');

  }

  filterPosts(event) {

    event.preventDefault();

    const target = $(event.currentTarget);
    const tag    = target.data('tag');

    this.$posts.each(function(index, item) {

      const el   = $(item);
      const tags = el.data('tags').split(' ');

      if(_.contains(tags, tag)) {
      
        el.show();
      
      } else if(tag === 'all') {
      
        el.show();
      
      } else {
        
        el.hide();

      }

    });

  }

}
