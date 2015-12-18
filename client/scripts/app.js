import $           from 'jquery';
import _           from 'underscore';
import TM          from 'gsap';
import Page        from 'page';
import Navigation  from 'app/utils/navigation';
import HomeView    from 'app/views/home';
import ExampleView from 'app/views/example';

class App {

	constructor() {

		this.initGlobals();

		const view = new HomeView;

		Page('*', function(ctx) {

      console.log(ctx)

    });

		// const nav = new Navigation();

		// nav.on('url:changed', id => {
			
		// 	this.renderView(id);

		// });

		// nav.init();

	}

	initGlobals() {

		// jquery
		window.$  = $;

		// underscore
		window._  = _;
		
		// TweenMax
		window.TM = TM;

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
