import Globals from 'app/utils/globals';
import Nav     from 'app/utils/navigation';
import Post    from 'app/components/post';
import View    from 'app/views/home';

const App = {};

App.init = function() {

  Nav.init();
  View.init();

  Post.init();
  Post.load();

  this.loadPosts();

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
