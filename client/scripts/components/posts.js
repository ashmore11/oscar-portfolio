import Happens from 'happens';
import Loader  from 'app/utils/loader';

export default class Posts {

  constructor() {

    this.$el              = $('.post');
    this.$postVideo       = this.$el.find('.video');
    this.$postVideoIframe = this.$postVideo.find('iframe');
    this.$postOtherVideos = this.$el.find('.other-videos');
    this.$postTitle       = this.$el.find('.title');
    this.$postDesc        = this.$el.find('.description');
    this.$postExtraBits   = this.$el.find('.extra-bits');

    this.postOpen = false;

    this.loader = new Loader;

  }

  load(post) {

    $.get(post, data => {

      this.data = data;

      if(!this.postOpen) {
        
        this.render();

      } else {

        this.unbind();
        this.hide();

      }

    });

  }

  render() {

    this.loader.start();

    this.$postVideoIframe.attr('src', this.data.fields.video);
    this.$postOtherVideos.html('');
    this.$postTitle.html(this.data.fields.title);
    this.$postDesc.html(this.data.fields.description);
    this.$postExtraBits.html(this.data.fields.extraBits);

    _.each(this.data.fields.otherVideos, (item, index) => {
      
      const html = `<li data-src="${item}">video ${index + 1}</li>`;

      this.$postOtherVideos.append(html);

    });

    this.bind();

  }

  bind() {

    this.loader.on('load:complete', this.show.bind(this));

    this.$postVideoIframe.on('load', () => {
    
      this.loader.stop();

    });
    
  }

  unbind() {

    this.$postVideoIframe.off('load');

    this.loader.off('load:complete');

  }

  show() {

    TM.set(this.$el, { height: 'auto' });

    const params = {
      height: 0,
      ease: Expo.easeInOut,
      onComplete: () => {

        this.postOpen = true;

      }
    };

    TM.from(this.$el, 1, params);

  }

  hide() {

    const params = {
      height: 0,
      ease: Expo.easeInOut,
      onComplete: () => {

        this.postOpen = false;
        
        this.render();

      }
    };

    TM.to(this.$el, 1, params);

  }

}
