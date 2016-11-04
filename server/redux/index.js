import keystone from 'keystone';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from '../../src/scripts/containers/App';
import count from '../../src/scripts/reducers/count';
import posts from '../../src/scripts/reducers/posts';

function renderFullPage(html, finalState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Oscar Portfolio</title>
      </head>
      <body>
        <div id="main">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(finalState)}
        </script>
        <script src="/scripts/vendors.js"></script>
        <script src="/scripts/bundle.js"></script>
      </body>
    </html>
  `;
}

module.exports = function handleRender(req, res) {
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

    const store = createStore(reducer, preloadedState);

    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const finalState = store.getState();

    res.send(renderFullPage(html, finalState));
  });
};
