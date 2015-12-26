import $       from 'jquery';
import _       from 'underscore';
import TM      from 'gsap';
import Happens from 'happens';
import Loader  from 'app/utils/loader';

const Post = {

  $el              : $('.post'),
  $postVideo       : $('.post').find('.video'),
  $postVideoIframe : $('.post').find('iframe'),
  $postOtherVideos : $('.post').find('.other-videos'),
  $postTitle       : $('.post').find('.title'),
  $postDesc        : $('.post').find('.description'),
  $postExtraBits   : $('.post').find('.extra-bits'),
  postID           : null,
  postOpen         : false,

};

Post.init = function() {

  Happens(this);

  Loader.init();

};

Post.load = function(id) {

  const host = window.location.origin;
  const post = `${host}/api/post/${id}`;

  if(this.postID !== id) {

    $.ajax({
      url: post,
      type: 'GET',
      success: data => { this.loadSuccess(data); },
      error: () => { this.emit('load:error'); }
    });

  }

};

Post.loadSuccess = function(data) {

  this.data = data.post;

  if(!this.postOpen) {
    
    this.render();

  } else {

    this.unbind();
    this.hide();

  }

};

Post.render = function() {

  Loader.start();

  this.$postVideoIframe.attr('src', this.data.video);
  this.$postOtherVideos.html('');
  this.$postTitle.html(this.data.title);
  this.$postDesc.html(this.data.description);
  this.$postExtraBits.html(this.data.extraBits);

  _.each(this.data.otherVideos, (item, index) => {
    
    const html = `<li data-src="${item}">video ${index + 1}</li>`;

    this.$postOtherVideos.append(html);

  });

  this.bind();

};

Post.bind = function() {

  Loader.on('load:complete', this.show.bind(this));

  this.$postVideoIframe.on('load', () => {
  
    Loader.stop();

  });
  
};

Post.unbind = function() {

  this.$postVideoIframe.off('load');

  Loader.off('load:complete');

};

Post.show = function() {

  TM.set(this.$el, { height: 'auto' });

  const params = {
    height: 0,
    ease: Expo.easeInOut,
    onComplete: () => {

      this.postOpen = true;

    }
  };

  TM.from(this.$el, 1, params);

};

Post.hide = function() {

  const params = {
    height: 0,
    ease: Expo.easeInOut,
    onComplete: () => {

      this.postOpen = false;
      
      this.render();

    }
  };

  TM.to(this.$el, 1, params);

};

export default Post;