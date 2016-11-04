const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);

/**
 * Import Route Controllers
 */
const routes = {
  api: importRoutes('../api'),
};

/**
 * Setup Route Bindings
 */
exports = module.exports = function(app) {
  app.get('/api/post/:slug', keystone.middleware.api, routes.api.posts.getPostById);
  app.get('/api/posts', keystone.middleware.api, routes.api.posts.getAllPosts);
};
