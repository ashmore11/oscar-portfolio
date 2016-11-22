import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import getStore from './store';
import routes from './routes';

const initialState = window.__initialState__;
const store = getStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store} key="provider">
        <Router history={history} routes={routes} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Enable hot reload by react-hot-loader
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      const RedBox = require('redbox-react').default;

      render(<RedBox error={error} />, document.getElementById('root'));
    }
  };

  module.hot.accept('./routes', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(document.getElementById('root'));
      reRenderApp();
    });
  });
}
