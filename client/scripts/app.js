import $          from 'jquery';
import _          from 'underscore';
import TM         from 'gsap';
import Navigation from 'app/utils/navigation';
import Post       from 'app/components/post';
import View       from 'app/views/home';

function App() {

  this.initGlobals();

  this.view = new View;
  this.post = new Post;

  this.loadInitialPost();
  this.loadPosts();

}

App.prototype.loadInitialPost = function() {

  const path = window.location.pathname;
  const id   = path.split('/')[1];

  if(id) this.post.load(id);

}

App.prototype.loadPosts = function() {

  Navigation.on('route:changed', id => {
    
    if(id !== '/') {
    
      this.post.load(id);

    }
  
  });

  this.post.on('load:error', function() {

    Navigation.go('/');

  });

}

App.prototype.initGlobals = function() {

  // jquery
  window.$  = $;

  // underscore
  window._  = _;
  
  // TweenMax
  window.TM = TM;

}

window.APP = new App;
