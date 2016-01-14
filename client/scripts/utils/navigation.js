import Happens from 'happens';
import Page    from 'page';

const Navigation = {

  init: function() {

  	Happens(this);

    this.navigate();

    Page({ click: false });

  },

  navigate: function() {

  	Page(ctx => {

  		this.emit('route:changed', ctx.pathname);

  	});

  },

  go: function(id) {

  	Page(id);

  },

};

export default Navigation;
