import path from 'path';
import querystring from 'querystring';

const src = path.resolve(process.env.PWD, 'src');

const entry = [
  'babel-polyfill',
  `${src}/scripts/client`,
];

const host = 'localhost';
const port = 3001;

if (process.env.NODE_ENV === 'development') {
  const hotQuery = querystring.stringify({
    path: 'http://' + host + ':' + port + '/__webpack_hmr',
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
