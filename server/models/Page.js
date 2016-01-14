var keystone = require('keystone');
var types    = keystone.Field.Types;

var page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: { 
		path: 'slug', 
		from: 'title', 
		unique: true 
	},
});

page.add({
	meta:{
		title: { type: types.Text },
		description: { type: types.Text },
		keywords: { type: types.Text },
		og: {
			title: { type: types.Text },
			description: { type: types.Text },
			image: { type: types.Text },
			url: { type: types.Url },
			type: { type: types.Text }
		}
	},
	title: { 
		type: types.Text,
		required: true
	},
	logo: {
		type: types.CloudinaryImage,
		required: true,
		initial: false
	}
});

page.defaultColumns = 'title';
page.register();
