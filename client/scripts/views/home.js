import Happens from 'happens';
import _       from 'underscore';
import $       from 'jquery';
import TM      from 'gsap';

export default class Home {
	
	constructor() {

		console.log('---[ VIEW HOME ]---');

		Happens(this);

		this.$el              = $('#home');
		this.$tag             = this.$el.find('.tags li');
		this.$posts           = this.$el.find('.posts li');
		this.$post            = this.$el.find('.post');
		this.$postVideo       = this.$post.find('.video');
		this.$postOtherVideos = this.$post.find('.other-videos');
		this.$postTitle       = this.$post.find('.title');
		this.$postDesc        = this.$post.find('.description');
		this.$postExtraBits   = this.$post.find('.extra-bits');

		this.postID   = null;
		this.postOpen = false;

		this.bindEvents();
		this.runIntroAnimation();
	
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
		const src    = `images/uploads/${image.data('over')}`;

		target.find('img').attr('src', src);

		this.$posts.not(target).addClass('blur');

		target.addClass('active');

	}

	mouseleave(event) {

		const target = $(event.currentTarget);
		const image  = target.find('img');
		const src    = `images/uploads/${image.data('out')}`;

		target.find('img').attr('src', src);

		this.$posts.removeClass('blur active');

	}

	loadPost(event) {

		event.preventDefault();

		this.postClicked = true;

		const target = $(event.currentTarget);
		const id     = target.attr('id');
		const host   = window.location.origin;
		const apiUrl = `keystone/api/posts/${id}`;

		$.get(`${host}/${apiUrl}`, data => {

			this.data = data;

			if(this.postID !== data.id) {
				
				this.renderPost();

			}

		});

	}

	renderPost() {

		this.postID = this.data.id;

		if(!this.postOpen) {

			this.$postVideo.find('iframe').attr('src', this.data.fields.video);
			this.$postOtherVideos.html('');
			this.$postTitle.html(this.data.fields.title);
			this.$postDesc.html(this.data.fields.description);
			this.$postExtraBits.html(this.data.fields.extraBits);

			_.each(this.data.fields.otherVideos, (item, index) => {
				
				const html = `<li data-src="${item}">video ${index + 1}</li>`;

				this.$postOtherVideos.append(html);

			});

			this.$postVideo.find('iframe').on('load', this.showPost.bind(this));

		} else {

			this.$postVideo.find('iframe').off('load');

			this.hidePost();

		}

	}

	showPost() {

		TM.set(this.$post, { height: 'auto' });

		const params = {
			height: 0,
			ease: Expo.easeInOut,
			onComplete: () => {

				this.postOpen = true;

			}
		};

		TM.from(this.$post, 1, params);

	}

	hidePost() {

		const params = {
			height: 0,
			ease: Expo.easeInOut,
			onComplete: () => {

				this.postOpen = false;
				
				if(this.postClicked) {
					this.renderPost();
				}

			}
		};

		TM.to(this.$post, 1, params);

	}

	filterPosts(event) {

		event.preventDefault();

		this.postClicked = false;

		this.hidePost();

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
