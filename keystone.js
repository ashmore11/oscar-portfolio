require('babel-register');
require('dotenv').load();

const keystone = require('keystone');
const body = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack/config.js');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const handleRender = require('./server/redux');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: config.output.path,
  historyApiFallback: true,
  noInfo: true,
  hot: true,
}));

app.use(webpackHotMiddleware(compiler));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(body.urlencoded({ extended: true }));
app.use(express.static('./dist'));
app.use(body.json());
app.use(multer());

keystone.init({
  name: 'Oscar Granse',
  brand: 'Oscar Granse',
  static: './dist',
  favicon: 'dist/favicon.ico',
  updates: 'server/updates',
  'auto update': true,
  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET,
});

keystone.import('./server/models');

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

keystone.set('nav', {
  posts: 'Post',
  tags: 'Tags',
  users: 'User',
});

keystone.initDatabaseConfig();
keystone.initExpressSession();

app.use(compression());
app.use('/keystone', keystone.Admin.Server.createStaticRouter(keystone));

app.use(keystone.expressSession);
app.use(keystone.session.persist);
app.use(require('connect-flash')());

app.use(morgan('tiny'));
app.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));

app.use(handleRender);

keystone.openDatabaseConnection(() => {
  const server = app.listen(process.env.PORT || 3002, () => {
    console.log(`\n\n Express server ready on port ${server.address().port} \n`);
  });
});
