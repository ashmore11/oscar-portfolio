require('dotenv').config();

const path = require('path');
const keystone = require('keystone');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Root = require('./client/scripts/entry.js');
const config = require('./webpack/config.js');
const compiler = webpack(config);

keystone.init({
  name: 'Oscar Granse',
  brand: 'Oscar Granse',
  static: 'dist',
  favicon: 'dist/favicon.ico',
  updates: 'server/updates',
  'auto update': true,
  session: true,
  auth: true,
  'user model': 'User',
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

// if (process.env.NODE_ENV === 'development') {
//   keystone.pre('routes', devMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     contentBase: config.output.path,
//     historyApiFallback: true,
//     noInfo: true,
//     hot: true,
//   }));

//   keystone.pre('routes', hotMiddleware(compiler));
// }

keystone.set('routes', (app) => {
  app.get('*', (req, res) => {
    res.sendFile(`${path.resolve(process.env.PWD, 'dist')}/index.html`);
  });
});

// keystone.start();
keystone.start({
  onMount() {
    const app = keystone.app;
    const express = require('express');

    app.use(devMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: config.output.path,
      historyApiFallback: true,
      noInfo: true,
      hot: true,
    }));

    app.use(hotMiddleware(compiler));
    app.use(express.static(path.resolve(process.env.PWD, 'dist')));
  },
});
