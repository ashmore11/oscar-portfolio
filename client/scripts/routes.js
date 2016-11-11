import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import NotFound from './containers/NotFound';

import Post from './components/Post';

const routes = (
  <Route path="/" component={App}>
    <Route path="/:postId" component={Post} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
