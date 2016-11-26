import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './config.babel';

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PORT || 3001;

app.use(devMiddleware(compiler, {
  contentBase: `http://localhost:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
}));

app.use(hotMiddleware(compiler));

app.listen(port, () => {
  console.info('==> 🚧  Webpack development server listening on port %s', port);
});
