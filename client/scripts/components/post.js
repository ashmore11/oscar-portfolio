import Happens from 'happens';
import Loader  from 'app/utils/loader';

export default class Post {

	constructor() {

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

	}

	load(id) {

		const host = window.location.origin;
    const post = `${host}/api/post/${id}`;

    if(this.postID !== id) {

      $.get(post, data => {

				this.data = data.post;

				if(!this.postOpen) {
					
					this.render();

				} else {

					this.unbind();
					this.hide();

				}

			});

      this.postID = id;

    }

	}

	render() {

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
