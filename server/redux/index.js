import keystone from 'keystone';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerRouter, createServerRenderContext } from 'react-router';

import App from '../../src/scripts/containers/App';
import count from '../../src/scripts/reducers/count';
import posts from '../../src/scripts/reducers/posts';

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/static/vendors.js"></script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}

exports = module.exports = function handleRender(req, res) {
  const Post = keystone.list('Post');

  Post.model.find().exec((err, item) => {
    const preloadedState = {
      count: 10,
      posts: item,
    };

    const reducer = combineReducers({
      count,
      posts,
    });

    const store = createStore(
      reducer,
      preloadedState
    );

    const context = createServerRenderContext();

    const html = renderToString(
      <Provider store={store}>
        <ServerRouter
          location={req.url}
          context={context}
        >
          <App />
        </ServerRouter>
      </Provider>
    );

    const finalState = store.getState();

    res.send(renderFullPage(html, finalState));
  });
};
