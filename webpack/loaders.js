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
      ENV.dev ? 'react-hot-loader/babel' : '',
      'transform-object-rest-spread',
      'transform-decorators-legacy',
    ],
  },
}, {
  test: /\.(jpg|png|gif|svg)$/i,
  loaders: [
    'file?hash=sha512&digest=hex&name=images/[name].[ext]',
    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
  ],
  include: `${PATHS.src}/images`,
}, {
  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'file',
  include: `${PATHS.src}/styles/fonts`,
  query: { name: 'fonts/[name].[ext]' },
}];

if (ENV.dev) {
  loaders.push(...[{
    test: /\.scss$/,
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

export default loaders;
