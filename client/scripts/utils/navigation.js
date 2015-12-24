import Happens from 'happens';
import Page    from 'page';

function Navigation() {

  Happens(this);

  Page(ctx => {

    this.emit('route:changed', ctx.pathname);

  });

  Page({ click: false });

};

Navigation.prototype.go = function(id) {

  Page(id);

};

export default new Navigation;
