import $           from 'jquery';
import _           from 'underscore';
import TM          from 'gsap';
import Navigation  from 'app/utils/navigation';
import HomeView    from 'app/views/home';
import ExampleView from 'app/views/example';

class App {

	constructor() {

		this.initGlobals();

		const nav = new Navigation();

		nav.on('url:changed', id => {
			
			this.renderView(id);

		});

		nav.init();

	}

	initGlobals() {

		window.$  = $;  // jquery
		window._  = _;  // underscore
		window.TM = TM; // TweenMax

	}

	get views() {

		return {
			home    : HomeView,
			example : ExampleView,
		};

	}

	renderView(id) {

		const view = new this.views[id]();

	}

}

const APP = new App();
