var keystone = require('keystone');

var Types = keystone.Field.Types;

var Tags = new keystone.List('tags', {
	map: { name: 'tag' },
	autokey: { path: 'slug', from: 'tag', unique: true }
});

Tags.add({
	tag: {
		type: String,
		initial: true,
		required: true
	}
});

Tags.defaultColumns = 'tag';
Tags.register();
