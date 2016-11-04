const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);

const api = importRoutes('../api');

exports = module.exports = (app) => {
  app.get('/api/post/:slug', keystone.middleware.api, api.posts.getPostById);
  app.get('/api/posts', keystone.middleware.api, api.posts.getAllPosts);
};
