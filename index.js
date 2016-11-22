require('dotenv').config();

// Setup global variables for node
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PROD__ = process.env.NODE_ENV === 'production';

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// This should be the same with webpack context
const dirRoot = require('path').join(process.cwd());

// Settings of webpack-isomorphic-tools
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/config.WIT'))
  .server(dirRoot, () => {
    require('./src/scripts/server/index.js');
  });
