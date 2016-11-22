global.__CLIENT__ = true;
global.__SERVER__ = false;
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PROD__ = process.env.NODE_ENV === 'production';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config.babel.js';

const app = express();
const compiler = webpack(config);
const port = (Number(process.env.PORT) + 1) || 3001;

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: config.output.path,
  historyApiFallback: true,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
}));

app.use(webpackHotMiddleware(compiler));

app.listen(port, () => {
  console.log(`==>  🚧  Webpack development server listening on port ${port}`);
});
