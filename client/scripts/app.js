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

};

App.init();
