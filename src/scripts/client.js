import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import getStore from './store';

const initialState = window.__initialState__;
const store = getStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const mountNode = document.getElementById('root');

render(
  <AppContainer>
    <Provider store={store} key="provider">
      <Router history={history} routes={routes} />
    </Provider>
  </AppContainer>,
  mountNode
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
      mountNode
    );
  });
}
