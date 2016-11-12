import path from 'path';
import querystring from 'querystring';

const src = path.resolve(process.env.PWD, 'src');
const entry = [];

if (process.env.NODE_ENV === 'development') {
  const hotQuery = querystring.stringify({
    path: '/__webpack_hmr',
    timeout: 20000,
    reload: true,
    noInfo: false,
  });

  entry.push(...[
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?${querystring.unescape(hotQuery)}`,
  ]);
}

entry.push(...[
  'babel-polyfill',
  `${src}/scripts/client.js`,
]);

export default entry;
