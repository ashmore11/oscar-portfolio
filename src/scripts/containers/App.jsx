import React from 'react';
import { MemoryRouter, Match, Miss } from 'react-router';

import MainHeader from '../components/MainHeader';

import Home from './Home';
import About from './about';
import Topics from './Topics';
import NotFound from './NotFound';

export default function App() {
  return (
    <MemoryRouter>
      <div className="App">
        <MainHeader />
        <Match exactly pattern="/" component={Home} />
        <Match pattern="/about" component={About} />
        <Match pattern="/topics" component={Topics} />
        <Miss component={NotFound} />
      </div>
    </MemoryRouter>
  );
}
