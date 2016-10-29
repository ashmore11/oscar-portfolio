require('dotenv').config();

const keystone = require('keystone');

keystone.init({
	'name': 'Oscar Granse',
	'brand': 'Oscar Granse',
	'static': 'dist',
	'favicon': 'dist/favicon.ico',
	'views': 'client',
	'view engine': 'jade',
	'updates': 'server/updates',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

keystone.import('./server/models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./server/routes'));

keystone.set('nav', {
	'posts': 'Post',
	'tags' : 'Tags',
	'users': 'User',
});

keystone.start();
