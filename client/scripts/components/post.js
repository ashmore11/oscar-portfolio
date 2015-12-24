import Happens    from 'happens';
import Loader     from 'app/utils/loader';
import Navigation from 'app/utils/navigation';

function Post() {

  Happens(this);

  this.$el              = $('.post');
  this.$postVideo       = this.$el.find('.video');
  this.$postVideoIframe = this.$postVideo.find('iframe');
  this.$postOtherVideos = this.$el.find('.other-videos');
  this.$postTitle       = this.$el.find('.title');
  this.$postDesc        = this.$el.find('.description');
  this.$postExtraBits   = this.$el.find('.extra-bits');

  this.postID   = null;
  this.postOpen = false;

  this.loader = new Loader;

};

Post.prototype.load = function(id) {

  const host = window.location.origin;
  const post = `${host}/api/post/${id}`;

  if(this.postID !== id) {

    $.ajax({
      url: post,
      type: 'GET',
      success: data => { this.loadSuccess(data); },
      error: data => { this.emit('load:error'); }
    });

  }

};

Post.prototype.loadSuccess = function(data) {

  this.data = data.post;

  if(!this.postOpen) {
    
    this.render();

  } else {

    this.unbind();
    this.hide();

  }

};

Post.prototype.render = function() {

  this.loader.start();

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

Post.prototype.bind = function() {

  this.loader.on('load:complete', this.show.bind(this));

  this.$postVideoIframe.on('load', () => {
  
    this.loader.stop();

  });
  
};

Post.prototype.unbind = function() {

  this.$postVideoIframe.off('load');

  this.loader.off('load:complete');

};

Post.prototype.show = function() {

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

Post.prototype.hide = function() {

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