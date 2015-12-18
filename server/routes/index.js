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
  app.get('/api/post/:id', keystone.middleware.api, routes.api.posts.get);

  // Catch All
  app.get('*', routes.controllers.home);
	
};
