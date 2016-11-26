import path from 'path';
import autoprefixer from 'autoprefixer';
import validate from 'webpack-validator';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import pkg from '../package.json';
import entry from './entry';
import loaders from './loaders';
import plugins from './plugins';
import resolve from './resolve';

const DEV = process.env.NODE_ENV === 'development';
const PATHS = {
  src: path.resolve(process.env.PWD, 'src'),
  dist: path.resolve(process.env.PWD, 'dist'),
};

const host = 'localhost';
const port = 3001;

const WITPlugin = new WebpackIsomorphicToolsPlugin(require('./config.WIT')).development(DEV);

const config = {
  debug: DEV,
  cache: true,
  devtool: DEV ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  context: process.env.PWD,
  entry,
  output: {
    path: PATHS.dist,
    filename: 'scripts/bundle.js',
    publicPath: 'http://' + host + ':' + port + '/'
  },
  plugins: plugins(WITPlugin),
  module: { loaders: loaders(WITPlugin) },
  postcss: { defaults: [autoprefixer({ browsers: pkg.config.browsers })] },
  resolve,
};

export default validate(config);
