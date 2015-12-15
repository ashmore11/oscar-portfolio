var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view   = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.section = 'home';

	view.query('page', keystone.list('Page').model.findOne({ slug: 'home' }));
	view.query('work', keystone.list('Post').model.find().populate('tags'));
	view.query('tags', keystone.list('Tags').model.find());
	
	view.render('home');
	
};
