import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import MainHeader from 'components/MainHeader';

import Home from 'containers/Home';
import About from 'containers/about';
import Topics from 'containers/Topics';
import NotFound from 'containers/NotFound';

import 'styles/main';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainHeader />
        <Match exactly pattern="/" component={Home} />
        <Match pattern="/about" component={About} />
        <Match pattern="/topics" component={Topics} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
}
