import Globals from 'app/utils/globals';
import Nav     from 'app/utils/navigation';
import Post    from 'app/components/post';
import View    from 'app/views/home';

const App = {};

App.init = function() {

  this.initGlobals();

  Nav.init();
  View.init();
  Post.init();

  this.loadInitialPost();
  this.loadPosts();

};

App.initGlobals = function() {

  Globals._.each(Globals, (value, key) => {

    this[key] = value;

  });

};

App.loadInitialPost = function() {

  const path = window.location.pathname;
  const id   = path.split('/')[1];

  if(id) Post.load(id);

};

App.loadPosts = function() {

  Nav.on('route:changed', id => {
    
    if(id !== '/') Post.load(id);
  
  });

  Post.on('load:error', function() {

    Nav.go('/');

  });

};

App.init();
