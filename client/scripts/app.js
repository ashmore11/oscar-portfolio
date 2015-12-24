import Globals    from 'app/utils/globals';
import Navigation from 'app/utils/navigation';
import Post       from 'app/components/post';
import View       from 'app/views/home';

function App() {

  this.initGlobals();

  this.view = new View;
  this.post = new Post;

  this.loadInitialPost();
  this.loadPosts();

};

App.prototype.initGlobals = function() {

  Globals._.each(Globals, (value, key) => {

    window[key] = value;

  });

};

App.prototype.loadInitialPost = function() {

  const path = window.location.pathname;
  const id   = path.split('/')[1];

  if(id) this.post.load(id);

};

App.prototype.loadPosts = function() {

  Navigation.on('route:changed', id => {
    
    if(id !== '/') this.post.load(id);
  
  });

  this.post.on('load:error', function() {

    Navigation.go('/');

  });

};

window.APP = new App;
