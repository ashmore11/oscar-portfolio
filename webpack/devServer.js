import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config.babel.js';

const app = express();
const compiler = webpack(config);
const port = (Number(process.env.PORT) + 1) || 3001;

app.use(webpackDevMiddleware(compiler, {
  contentBase: `http://localhost:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
}));

app.use(webpackHotMiddleware(compiler));

app.listen(port, () => {
  console.log(`==>  🚧  Webpack development server listening on port ${port}`);
});
