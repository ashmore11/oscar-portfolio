import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'app/store';

import App from 'containers/App';

export default class Main {
  constructor(rootElement) {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store} key="provider">
          <App />
        </Provider>
      </AppContainer>,
      rootElement
    );

    if (module.hot) {
      module.hot.accept('containers/App', () => {
        const NextApp = require('containers/App').default;
        ReactDOM.render(
          <AppContainer>
            <Provider store={store} key="provider">
              <NextApp />
            </Provider>
          </AppContainer>,
          rootElement
        );
      });
    }
  }
}
