var keystone = require('keystone');
var types    = keystone.Field.Types;

var post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { 
		path: 'slug', 
		from: 'title', 
		unique: true 
	},
	sortable: true
});

post.add({
	createdOn: {
		type: Date, 
		default: Date.now 
	},
	state: {
    type: types.Select,
    options: ['draft', 'published'],
    default: 'draft',
    initial: true,
    required: true
  },
	title: {
		type: String,
		required: true,
		initial: true
	},
	description: {
		type: types.Textarea,
		required: false,
		initial: false
	},
	tags: { 
		type: types.Relationship, 
		ref: 'Tags',
		many: true
	},
	stillImage: {
		required: false,
		initial: false,
		type: types.LocalFile,
		dest: process.env.PWD + '/public/images/uploads/'
	},
	gif: {
		required: false,
		initial: false,
		type: types.LocalFile,
		dest: process.env.PWD + '/public/images/uploads/'
	},
	video: {
		type: types.Url,
		required: false
	},
	otherVideos: {
		type: types.TextArray,
		required: false
	},
	extraBits: {
		type: types.Html,
		wysiwyg: true,
		height: 300,
		required: false,
		initial: false
	}
});

post.defaultColumns = 'title, state, createdOn';
post.register();
