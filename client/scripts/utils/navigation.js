import Happens from 'happens';
import Page    from 'page';

const Navigation = {};

Navigation.init = function() {

	Happens(this);

  this.navigate();

  Page({ click: false });

};

Navigation.navigate = function() {

	Page(ctx => {

		this.emit('route:changed', ctx.pathname);

	});

};

Navigation.go = function(id) {

	Page(id);

};

export default Navigation;
