var keystone = require('keystone');

var Types = keystone.Field.Types;

var Category = new keystone.List('categories', {
	map: { name: 'category' },
	autokey: { path: 'slug', from: 'category', unique: true }
});

Category.add({
	category: {
		type: String,
		initial: true,
		required: true
	}
});

Category.relationship({ 
	path: 'Work', 
	ref: 'Work', 
	refPath: 'categories'
});

Category.defaultColumns = 'category';

Category.register();
