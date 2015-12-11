var keystone = require('keystone');

var Types = keystone.Field.Types;

var Work = new keystone.List('work', {
	map: { name: 'title' },
	defaultSort: '-createdOn',
	autokey: { path: 'slug', from: 'title', unique: true }
});

Work.add({
	createdOn: {
		type: Date, 
		default: Date.now 
	},
	title: {
		type: String,
		required: true,
		initial: true
	},
	description: {
		type: Types.Textarea,
		required: false,
		initial: false
	},
	categories: { 
		type: Types.Relationship, 
		ref: 'categories'
	},
	image: {
		require: true,
		initial: false,
		type: Types.LocalFile,
		dest: process.env.PWD + '/public/images/uploads/'
	},
	video: {
		type: Types.Url,
		required: false
	},
	extraBits: {
		type: Types.Html,
		wysiwyg: true,
		height: 300,
		required: false,
		initial: false
	},
	published: {
		type: Types.Boolean,
		required: true,
		initial: false
	}
});

Work.defaultColumns = 'title, createdOn';
Work.register();
