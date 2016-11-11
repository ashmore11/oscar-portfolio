import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import routes from './routes';
import posts from './reducers/posts';
import tags from './reducers/tags';
import navigation from './reducers/navigation';

import '../styles/main';

const reducer = combineReducers({
  posts,
  tags,
  navigation,
  routing: routerReducer,
});

const initialState = window.__initialState__;

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextRouter = require('./routes').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NextRouter history={history} routes={routes} />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
