const path = require('path');
const querystring = require('querystring');

const src = path.resolve(process.env.PWD, 'client');

const entry = [
  'babel-polyfill',
  `${src}/scripts/entry.js`,
];

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

module.exports = entry;
