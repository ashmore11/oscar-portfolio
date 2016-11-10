import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import posts from 'reducers/posts';
import tags from 'reducers/tags';
import navigation from 'reducers/navigation';

const preloadedState = window.__PRELOADED_STATE__;

const reducer = combineReducers({
  posts,
  tags,
  navigation,
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
