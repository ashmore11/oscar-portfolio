import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import Home from 'containers/Home';
import NotFound from 'containers/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Match pattern="/" component={Home} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
}
