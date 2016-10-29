var keystone     = require('keystone');
var middleware   = require('./middleware');
var importRoutes = keystone.importer(__dirname);

/**
 * Common Middleware
 */
keystone.pre('routes', middleware.initLocals);

/**
 * Import Route Controllers
 */
var routes = {
	controllers: importRoutes('../controllers'),
  api: importRoutes('../api')
};

/**
 * Setup Route Bindings
 */
exports = module.exports = function(app) {
	
  // Views
	app.get('/', routes.controllers.home);

  // API
  app.get('/api/post/:slug', keystone.middleware.api, routes.api.posts.getPostById);
  app.get('/api/posts', keystone.middleware.api, routes.api.posts.getAllPosts);

  // Catch All
  app.get('*', routes.controllers.home);
	
};
