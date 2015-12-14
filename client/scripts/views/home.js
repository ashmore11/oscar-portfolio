import $ from 'jquery';

export default class Home {
	
	constructor() {

		console.log('---[ VIEW HOME ]---');

		this.$el = $('#home');

		this.bindEvents();
	
	}

	bindEvents() {

		this.$el.find('li').on('click', this.liClicked.bind(this));

	}

	liClicked(event) {

		const tags = $(event.currentTarget).data('tags');

		console.log(tags);

	}

}
