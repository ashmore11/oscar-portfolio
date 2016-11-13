import path from 'path';
import autoprefixer from 'autoprefixer';
import validate from 'webpack-validator';

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
  postcss: { defaults: [autoprefixer({ browsers: pkg.config.browsers })] },
  resolve,
};

export default validate(config);
