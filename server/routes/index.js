var keystone     = require('keystone');
var middleware   = require('./middleware');
var importRoutes = keystone.importer(__dirname);

const api = importRoutes('../api')

/**
 * Setup Route Bindings
 */
exports = module.exports = function(app) {
  // API
  app.get('/api/post/:slug', keystone.middleware.api, api.posts.getPostById);
  app.get('/api/posts', keystone.middleware.api, api.posts.getAllPosts);
	
  // Views
	app.get('/', function(req, res) {
    var view = new keystone.View(req, res);
    view.render('index');
  });

  // Catch All
  app.get('*', function(req, res) {
    var view = new keystone.View(req, res);
    view.render('errors/404');
  });	
};
