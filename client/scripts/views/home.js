import $        from 'jquery';
import _        from 'underscore';
import TM       from 'gsap';
import Nav      from 'app/utils/navigation';
import BaseView from 'app/views/baseView';

const Home = Object.create(BaseView);

Object.defineProperties(Home, {

  $el: {
    value: $('#home'),
    writable: false,
  },

  $tag: {
    value: $('#home').find('.tags li'),
    writable: false,
  },

  $posts: {
    value: $('#home').find('.posts li'),
    writable: false,
  },

});

Home.init = function() {
  
  this.bind();
  this.runIntroAnimation();

};

Home.bind = function() {

  this.bindEvent(this.$posts, 'mouseeneter', this.mouseeneter);
  this.bindEvent(this.$posts, 'mouseleave',  this.mouseleave);

  this.bindEvent(this.$posts, 'click', this.postClicked);
  this.bindEvent(this.$tag,   'click', this.filterPosts);

};

Home.unbind = function() {

  this.$posts.off('mouseenter');
  this.$posts.off('mouseleave');

  this.$posts.off('click');
  this.$tag.off('click');

};

Home.runIntroAnimation = function() {

  _.each(this.$posts, (item, index) => {

    const params = {
      y: 0,
      opacity: 1,
      delay: index * 0.085,
      ease: Power3.easeOut
    };

    TM.to($(item), 1, params);

  });

};

Home.mouseenter = function(event) {

  const target = $(event.currentTarget);
  const image  = target.find('img');
  const src    = image.data('over');

  target.find('img.over').css({ display: 'block' })

  target.addClass('active');

};

Home.mouseleave = function(event) {

  const target = $(event.currentTarget);
  const image  = target.find('img');
  const src    = image.data('out');

  target.find('img.over').css({ display: 'none' })

  this.$posts.removeClass('active');

};

Home.postClicked = function(event) {

  event.preventDefault();

  this.postClicked = true;

  const target = $(event.currentTarget);
  const id     = target.attr('id');

  this.$posts.removeClass('open');
  target.addClass('open');

  Nav.go(id);

};

Home.filterPosts = function(event) {

  event.preventDefault();

  const target = $(event.currentTarget);
  const tag    = target.data('tag');

  _.each(this.$posts, (item, index) => {

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

};

export default Home;
