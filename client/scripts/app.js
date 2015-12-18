import $          from 'jquery';
import _          from 'underscore';
import TM         from 'gsap';
import Navigation from 'app/utils/navigation';
import Post       from 'app/components/post';
import View       from 'app/views/home';

class App {

	constructor() {

		this.initGlobals();

		this.view = new View;
		this.post = new Post;

		this.loadInitialPost();
		this.loadPosts();

	}

	loadInitialPost() {

		const path = window.location.pathname;
		const id   = path.split('/')[1];

		if(id) { this.post.load(id); }

	}

	loadPosts() {

		Navigation.on('route:changed', id => {
			
			this.post.load(id);
		
		});

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
