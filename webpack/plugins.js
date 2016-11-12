const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const PATHS = {
  src: path.resolve(process.env.PWD, 'src'),
  dist: path.resolve(process.env.PWD, 'dist'),
};

const plugins = [
  new ProgressBarPlugin({ clear: false }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      CLIENT: true,
    },
  }),
  new webpack.DllReferencePlugin({
    context: PATHS.src,
    manifest: require(`${PATHS.dist}/scripts/vendors.manifest.json`),
  }),
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(...[
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]);
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(...[
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false },
    }),
  ]);
}

module.exports = plugins;
