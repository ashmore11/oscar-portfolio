import keystone from 'keystone';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet';

import getStore from '../store';
import routes from '../routes';
import Html from '../containers/Html';

export default async function handleRender(req, res) {
  if (__DEV__) webpackIsomorphicTools.refresh();

  const Post = keystone.list('Post');
  const Tags = keystone.list('Tags');

  const initialState = {
    posts: await Post.model.find({ state: 'published' }).exec(),
    tags: {
      items: await Tags.model.find().exec(),
      activeTag: 'all',
    },
  };

  const memoryHistory = createMemoryHistory(req.path);
  const store = getStore(initialState, memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match(
    { history, routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const content = renderToString(
          <Provider store={store} key="provider">
            <RouterContext {...renderProps} />
          </Provider>
        );
        const head = Helmet.rewind();

        res.send(`
          <!doctype html>
          ${renderToString(
            <Html
              head={head}
              assets={webpackIsomorphicTools.assets()}
              content={content}
              store={store}
            />
          )}
        `);
      }
    }
  );
}
