import $        from 'jquery';
import _        from 'underscore';
import TM       from 'gsap';
import Nav      from 'app/utils/navigation';
import BaseView from 'app/views/baseView';

const View = Object.create(BaseView, {

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

View.init = function() {

  this.bind();
  this.runIntroAnimation();

};

View.bind = function() {

  this.bindEvent(this.$posts, 'mouseenter', this.mouseenter.bind(this));
  this.bindEvent(this.$posts, 'mouseleave',  this.mouseleave.bind(this));

  this.bindEvent(this.$posts, 'click', this.postClicked.bind(this));

};

View.unbind = function() {

  this.disposeEvent(this.$posts, 'mouseenter');
  this.disposeEvent(this.$posts, 'mouseleave');

  this.disposeEvent(this.$posts, 'click');
  this.disposeEvent(this.$tag, 'click');

};

View.mouseenter = function(event) {

  const target = $(event.currentTarget);
  const image  = target.find('img');
  const src    = image.data('over');

  target.find('img.over').css({ display: 'block' })

  target.addClass('active');

};

View.mouseleave = function(event) {

  const target = $(event.currentTarget);
  const image  = target.find('img');
  const src    = image.data('out');

  target.find('img.over').css({ display: 'none' })

  this.$posts.removeClass('active');

};

View.postClicked = function(event) {

  event.preventDefault();

  this.postClicked = true;

  const target = $(event.currentTarget);
  const id     = target.attr('id');

  this.$posts.removeClass('open');
  target.addClass('open');

  Nav.go(id);

};

View.runIntroAnimation = function() {

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

export default View;
