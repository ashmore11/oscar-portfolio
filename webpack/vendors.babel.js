import path from 'path';
import webpack from 'webpack';

const ENV = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',
};

const config = {
  debug: ENV.dev,
  cache: true,
  devtool: ENV.dev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: {
    vendors: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
      'react-router-redux',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.env.PWD, 'dist/scripts'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(process.env.PWD, 'dist/scripts', '[name].manifest.json'),
      context: path.resolve(process.env.PWD, 'src'),
    }),
  ],
};

if (ENV.prod) {
  config.plugins.push(...[
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false },
    }),
  ]);
}

export default config;
