import React from 'react';
import { Link } from 'react-router';

export default function MainHeader() {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
    </ul>
  );
}
