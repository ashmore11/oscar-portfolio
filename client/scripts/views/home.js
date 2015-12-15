import $ from 'jquery';

export default class Home {
	
	constructor() {

		console.log('---[ VIEW HOME ]---');

		this.$el   = $('#home');
		this.$post = this.$el.find('li a');

		this.bindEvents();
	
	}

	bindEvents() {

		this.$post.on('mouseenter', this.mouseenter.bind(this));
		this.$post.on('mouseleave', this.mouseleave.bind(this));

	}

	mouseenter(event) {

		const target = $(event.currentTarget);

		this.$post.not(target).addClass('blur');

	}

	mouseleave() {

		this.$post.removeClass('blur');

	}

}
