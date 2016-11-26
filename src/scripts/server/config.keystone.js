export const options = {
  name: 'Oscar Granse',
  brand: 'Oscar Granse',

  static: 'dist',
  favicon: 'dist/favicon.ico',

  mongo: process.env.MONGO_URI || 'mongodb://localhost/27017',
  updates: 'server/updates',
  'auto update': true,
  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET,

  'admin path': 'admin',
};

export const nav = {
  posts: 'Post',
  tags: 'Tags',
  users: 'User',
};
