import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const PATHS = {
  src: path.resolve(process.env.PWD, 'src'),
  dist: path.resolve(process.env.PWD, 'dist'),
};
const ENV = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',
};

export default function (WITPlugin) {
  const loaders = [{
    test: /\.jsx?$/,
    loader: 'babel',
    include: `${PATHS.src}/scripts`,
    query: {
      cacheDirectory: true,
      presets: [
        'react',
        'es2015',
        'stage-0',
      ],
      plugins: [
        'transform-object-rest-spread',
        'transform-decorators-legacy',
      ],
    },
  }, {
    test: WITPlugin.regular_expression('images'),
    loaders: [
      'file?hash=sha512&digest=hex&name=images/[name].[ext]',
      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
    ],
    include: `${PATHS.src}/images`,
  }, {
    test: WITPlugin.regular_expression('fonts'),
    loader: 'file',
    include: `${PATHS.src}/styles/fonts`,
    query: { name: 'fonts/[name].[ext]' },
  }];

  if (ENV.dev) {
    loaders[0].query.plugins.unshift(...[
      'react-hot-loader/babel',
    ]);

    loaders.push(...[{
      test: WITPlugin.regular_expression('styles'),
      loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap', 'import-glob'],
      include: `${PATHS.src}/styles`,
    }]);
  }

  if (ENV.prod) {
    loaders.push(...[{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass', 'import-glob']),
      include: `${PATHS.src}/styles`,
    }]);
  }

  return loaders;
}
