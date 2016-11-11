import keystone from 'keystone';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import posts from '../client/scripts/reducers/posts';
import tags from '../client/scripts/reducers/tags';
import navigation from '../client/scripts/reducers/navigation';
import routes from '../client/scripts/routes';

import Html from './Html';

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

export default async function handleRender(req, res) {
  const Post = keystone.list('Post');
  const Tags = keystone.list('Tags');

  const data = {
    posts: await Post.model.find({ state: 'published' }).exec(),
    tags: await Tags.model.find().exec(),
  };

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
        store = configureStore(memoryHistory, data);
        const content = renderToString(
          <AppContainer>
            <Provider store={store} key="provider">
              <RouterContext {...renderProps} />
            </Provider>
          </AppContainer>
        );

        res.send(`
          <!doctype html>
          ${renderToString(<Html content={content} store={store} />)}
        `);
      }
    }
  );
}
