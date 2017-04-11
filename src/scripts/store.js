import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import posts from './reducers/posts';
import tags from './reducers/tags';

export default function getStore(initialState = {}, history) {
  const reducer = combineReducers({
    posts,
    tags,
    routing,
  });

  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
}
