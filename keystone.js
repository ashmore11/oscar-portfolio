import 'babel-register';

import _ from './env.js';

import path from 'path';
import keystone from 'keystone';
import body from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack/config.js';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
// import handleRender from './server/redux';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import posts from './client/scripts/reducers/posts';
import tags from './client/scripts/reducers/tags';
import navigation from './client/scripts/reducers/navigation';
import routes from './client/scripts/routes';

const app = express();
const compiler = webpack(config);

app.set('view engine', 'ejs');
app.set('views', path.resolve(process.env.PWD, 'client/templates'));

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

  updates: 'server/updates',
  'auto update': true,
  mongo: process.env.MONGO_URI || 'mongodb://localhost/27017',
  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET,
  'admin path': 'admin',
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
app.use('/admin', keystone.Admin.Server.createStaticRouter(keystone));

app.use(keystone.expressSession);
app.use(keystone.session.persist);
app.use(require('connect-flash')());

app.use(morgan('tiny'));
app.use('/admin', keystone.Admin.Server.createDynamicRouter(keystone));

function configureStore(memoryHistory, initialState = {}) {
  const reducer = combineReducers({
    posts,
    tags,
    navigation,
    routing: routerReducer,
  });

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, routerMiddleware(memoryHistory))
    )
  );
  return store;
}

async function fetchData() {
  const Post = keystone.list('Post');
  const Tags = keystone.list('Tags');

  return {
    posts: await Post.model.find({ state: 'published' }).exec(),
    tags: await Tags.model.find().exec(),
  };
}

const Html = ({ content, store }) => (
  <html>
    <head>
      <title>Oscar Portfolio</title>
    </head>
    <body>
      <div id="root"
        dangerouslySetInnerHTML={
          { __html: content }
        }
      />
      <script
        dangerouslySetInnerHTML={
          { __html: `window.__initialState__=${JSON.stringify(store.getState())};` }
        }
      />
      <script src="/scripts/vendors.js"></script>
      <script src="/scripts/bundle.js"></script>
    </body>
  </html>
);

app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.path);
  let store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match(
    { history, routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        fetchData().then((data) => {
          store = configureStore(memoryHistory, data);
          const content = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          res.send(`
            <!doctype html>
            ${renderToString(<Html content={content} store={store} />)}
          `);
        });
      }
    }
  );
});

// app.use(handleRender);

keystone.openDatabaseConnection(() => {
  const server = app.listen(process.env.PORT || 3002, () => {
    console.log(`\n\n Express server ready on port ${server.address().port} \n`);
  });
});
