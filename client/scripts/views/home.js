import Navigation from 'app/utils/navigation';

export default class Home {
  
  constructor() {

    this.$el    = $('#home');
    this.$tag   = this.$el.find('.tags li');
    this.$posts = this.$el.find('.posts li');

    this.bindEvents();
    this.runIntroAnimation();
  
  }

  bindEvents() {

    this.$posts.on('mouseenter', this.mouseenter.bind(this));
    this.$posts.on('mouseleave', this.mouseleave.bind(this));

    this.$posts.on('click', this.postClicked.bind(this));
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

    target.find('img.over').css({ display: 'block' })

    target.addClass('active');

  }

  mouseleave(event) {

    const target = $(event.currentTarget);
    const image  = target.find('img');
    const src    = image.data('out');

    target.find('img.over').css({ display: 'none' })

    this.$posts.removeClass('active');

  }

  postClicked(event) {

    event.preventDefault();

    this.postClicked = true;

    const target = $(event.currentTarget);
    const id     = target.attr('id');

    this.$posts.removeClass('open');
    target.addClass('open');

    Navigation.go(id);

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
