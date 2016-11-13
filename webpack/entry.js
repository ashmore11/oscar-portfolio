import path from 'path';
import querystring from 'querystring';

const src = path.resolve(process.env.PWD, 'src');

const entry = [
  'babel-polyfill',
  `${src}/scripts/client.js`,
];

if (process.env.NODE_ENV === 'development') {
  const hotQuery = querystring.stringify({
    path: '/__webpack_hmr',
    timeout: 20000,
    reload: true,
    noInfo: true,
  });

  entry.unshift(...[
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?${querystring.unescape(hotQuery)}`,
  ]);
}

export default entry;
