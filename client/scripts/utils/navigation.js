import Happens from 'happens';
import Page    from 'page';

class Navigation {

	constructor() {

		Happens(this);

		Page(ctx => {

			this.emit('route:changed', ctx.pathname);

		});

	}

	go(id) {

		Page(id);

	}

}

export default new Navigation;
