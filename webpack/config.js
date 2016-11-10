const path = require('path');
const autoprefixer = require('autoprefixer');
const validate = require('webpack-validator');
const browsers = require('../package.json').config.browsers;
const entry = require('./entry');
const loaders = require('./loaders');
const plugins = require('./plugins');
const resolve = require('./resolve');

const DEV = process.env.NODE_ENV === 'development';
const PATHS = {
  src: path.resolve(process.env.PWD, 'client'),
  dist: path.resolve(process.env.PWD, 'dist'),
};

const config = {
  debug: DEV,
  cache: true,
  devtool: DEV ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry,
  output: {
    path: PATHS.dist,
    filename: 'scripts/bundle.js',
    publicPath: '/',
  },
  plugins,
  module: { loaders },
  postcss: { defaults: [autoprefixer({ browsers })] },
  resolve,
};

module.exports = validate(config);
