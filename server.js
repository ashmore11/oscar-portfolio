import './env.js';

import path from 'path';
import keystone from 'keystone';
import body from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';

import config from './webpack/config.babel.js';
import handleRender from './src/scripts/server/handleRender';

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
app.use(express.static(path.resolve(process.env.PWD, 'dist')));
app.use(body.json());
app.use(multer());

keystone.init({
  name: 'Oscar Granse',
  brand: 'Oscar Granse',

  static: 'dist',
  favicon: 'dist/favicon.ico',

  updates: 'src/scripts/updates',
  'auto update': true,
  mongo: process.env.MONGO_URI || 'mongodb://localhost/27017',
  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET,
  'admin path': 'admin',
});

keystone.import('./src/scripts/models');

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
app.use(`/${keystone.get('admin path')}`, keystone.Admin.Server.createStaticRouter(keystone));

app.use(keystone.expressSession);
app.use(keystone.session.persist);
app.use(require('connect-flash')());

app.use(morgan('tiny'));
app.use(`/${keystone.get('admin path')}`, keystone.Admin.Server.createDynamicRouter(keystone));

app.use(handleRender);

keystone.openDatabaseConnection(() => {
  const server = app.listen(process.env.PORT || 3002, () => {
    console.log(`\n\n Express server ready on port ${server.address().port} \n`);
  });
});
