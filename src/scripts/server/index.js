import keystone from 'keystone';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';

import handleRender from './handleRender';
import { options, nav } from './config.keystone';

const app = express();

// Initialise keystone.
keystone.init(options);
keystone.import('./models');
keystone.set('nav', nav);

// Setup keystone database.
keystone.initDatabaseConfig();
keystone.initExpressSession();

app.use(compression());
app.use('/admin', keystone.Admin.Server.createStaticRouter(keystone));
app.use(express.static('dist'));

app.use(keystone.get('session options').cookieParser);
app.use(keystone.expressSession);
app.use(keystone.session.persist);
app.use(require('connect-flash')());

app.use(morgan('tiny'));
app.use('/admin', keystone.Admin.Server.createDynamicRouter(keystone));

// Use React universal rendering.
app.use(handleRender);

// Open keystone db and run express.
keystone.openDatabaseConnection(() => {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Express server ready on port ${server.address().port}`);
  });
});
