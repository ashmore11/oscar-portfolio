import path from 'path';
import webpack from 'webpack';

const DEV = process.env.NODE_ENV === 'development';

const config = {
  debug: DEV,
  cache: true,
  devtool: DEV ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: {
    vendors: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
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

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(...[
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false },
    }),
  ]);
}

export default config;
