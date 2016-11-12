import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import posts from './reducers/posts';
import tags from './reducers/tags';
import navigation from './reducers/navigation';


export default function getStore(initialState = {}, history) {
  const middlewares = [
    routerMiddleware(history),
    thunk,
  ];

  const reducer = combineReducers({
    posts,
    tags,
    navigation,
    routing,
  });

  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares)
    )
  );
}
