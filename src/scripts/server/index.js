import path from 'path';
import keystone from 'keystone';
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';

import handleRender from './handleRender';
import { options, nav } from './config.keystone';

const app = express();
const port = process.env.PORT || 3000;

// Using helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution.
app.use(hpp());
// Compress all requests
app.use(compression());

app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.resolve(process.env.PWD, 'dist/favicon.ico')));
app.use(express.static(path.resolve(process.env.PWD, 'dist')));

// if (__DEV__) {
//   const webpack = require('webpack');
//   const config = require('../../../webpack/config.babel.js').default;
//   const compiler = webpack(config);

//   app.use(require('webpack-dev-middleware')(compiler, {
//     publicPath: config.output.publicPath,
//     noInfo: true,
//     stats: { colors: true },
//   }));

//   app.use(require('webpack-hot-middleware')(compiler));
// }

// Initialise keystone.
keystone.init(options);
keystone.import('./models');
keystone.set('nav', nav);

// Setup keystone database.
keystone.initDatabaseConfig();
keystone.initExpressSession();

app.use('/admin', keystone.Admin.Server.createStaticRouter(keystone));

app.use(keystone.get('session options').cookieParser);
app.use(keystone.expressSession);
app.use(keystone.session.persist);
app.use(require('connect-flash')());

app.use('/admin', keystone.Admin.Server.createDynamicRouter(keystone));

// Use React universal rendering.
app.use(handleRender);

// Open keystone db and run express.
keystone.openDatabaseConnection(() => {
  app.listen(port, () => {
    console.log(`Express server ready on port ${port}`);
  });
});
