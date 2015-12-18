import $    from 'jquery';
import _    from 'underscore';
import TM   from 'gsap';
import Page from 'page';
import View from 'app/views/home';

class App {

	constructor() {

		this.initGlobals();

		const view = new View;

		// Page(function(ctx) {

		// 	view.loadPost(ctx.pathname);

		// });

	}

	initGlobals() {

		// jquery
		window.$  = $;

		// underscore
		window._  = _;
		
		// TweenMax
		window.TM = TM;

	}

}

const APP = new App;
