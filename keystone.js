require('dotenv').config();

const keystone = require('keystone');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
import React from 'react';
import Router from 'react-router';
import Helmet from 'react-helmet';
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

if (process.env.NODE_ENV === 'development') {
  keystone.pre('routes', devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: config.output.path,
    historyApiFallback: true,
    noInfo: true,
    hot: true,
  }));

  keystone.pre('routes', hotMiddleware(compiler));
}

keystone.set('routes', (app) => {
  app.get('*', function(req, res) {
    /* create a router and give it our routes
       and the requested path */
    let router = Router.create({
        location: req.url,
        routes: routes,
    });

    router.run(function(Root, state) {
        /* render `Root` (the complete document) to string
           and rewind Helmet for access to its data.
           Read about why rewinding is necessary on the server:
           https://github.com/nfl/react-helmet#server-usage */
        let renderedBody = React.renderToString(<Root />);
        let head = Helmet.rewind();

        /* render document with Helmet-rendered `<head>` info
           and React-rendered body. then, initialize the client
           side via `client.js`.
           Note: Helmet will update your page's `<head`> on the client
                 side, but you must construct `<head>` manually
                 on the server. */
        let html = `
            <!doctype html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title>${head.title}</title>
                    ${head.meta}
                    ${head.link}
                </head>
                <body>
                    <div id="app">${renderedBody}</div>
                    <script src="/static/client.js"></script>
                </body>
            </html>
        `;

        /* write html, close connection */
        res.write(html);
        res.end();
    });
});

});

keystone.start();
