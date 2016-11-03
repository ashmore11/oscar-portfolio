const keystone = require('keystone');
const types = keystone.Field.Types;

const post = new keystone.List('Post', {
  map: { name: 'title' },
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  sortable: true,
});

post.add({
  createdOn: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: types.Select,
    options: ['draft', 'published'],
    default: 'draft',
    initial: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
    initial: true,
  },
  description: {
    type: types.Textarea,
    required: false,
  },
  tags: {
    type: types.Relationship,
    ref: 'Tags',
    many: true,
  },
  image: {
    type: types.CloudinaryImage,
    required: true,
    initial: false,
  },
  animatedGif: {
    type: types.CloudinaryImage,
    required: true,
    initial: false,
  },
  video: {
    type: types.Url,
    required: false,
  },
  otherVideos: {
    type: types.TextArray,
    required: false,
  },
  extraBits: {
    type: types.Html,
    wysiwyg: true,
    height: 300,
    required: false,
  },
});

post.defaultColumns = 'title, state, createdOn';
post.register();
