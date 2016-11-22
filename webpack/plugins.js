import path from 'path';
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import cssnano from 'cssnano';

const PATHS = {
  src: path.resolve(process.env.PWD, 'src'),
  dist: path.resolve(process.env.PWD, 'dist'),
};
const ENV = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',
};

export default function (WITPlugin) {
  const plugins = [
    new ProgressBarPlugin({ clear: false }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.DllReferencePlugin({
      context: PATHS.src,
      manifest: require(`${PATHS.dist}/scripts/vendors.manifest.json`),
    }),
    WITPlugin.development(ENV.dev),
  ];

  if (ENV.dev) {
    plugins.push(...[
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]);
  }

  if (ENV.prod) {
    plugins.push(...[
      new ExtractTextPlugin('styles/styles.css'),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: { warnings: false },
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true,
      }),
    ]);
  }

  return plugins;
}
