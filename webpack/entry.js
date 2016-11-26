import path from 'path';
import querystring from 'querystring';

const PORT = process.env.PORT || 3001;

const entry = [
  'babel-polyfill',
  `${path.resolve(process.env.PWD, 'src')}/scripts/client.js`,
];

if (process.env.NODE_ENV === 'development') {
  const hotQuery = querystring.stringify({
    path: `http://localhost:${PORT}/__webpack_hmr`,
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
