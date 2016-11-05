import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import count from 'reducers/count';
import posts from 'reducers/posts';
import tags from 'reducers/tags';

const preloadedState = window.__PRELOADED_STATE__;

const reducer = combineReducers({
  count,
  posts,
  tags,
});

const store = createStore(
  reducer,
  preloadedState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
