import React from 'react';
import { IndexRoute, Route } from 'react-router';

import AppContainer from './containers/App';
import Home from './containers/Home';
import NotFound from './containers/NotFound';

import Post from './components/Post';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={Home}>
      <Route path="/:postId" component={Post} />
    </IndexRoute>
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
