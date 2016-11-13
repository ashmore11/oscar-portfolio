import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import getStore from './store';
import routes from './routes';

import '../styles/main';

const initialState = window.__initialState__;
const store = getStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Provider store={store} key="provider">
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
        <Provider store={store} key="provider">
          <NextRouter history={history} routes={routes} />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
