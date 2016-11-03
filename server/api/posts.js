const keystone = require('keystone');
const Post = keystone.list('Post');

/**
 * Get Post by Id
 */
exports.getPostById = (req, res) => {
  Post.model.findOne({ slug: req.params.slug }).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    return res.apiResponse(item);
  });
};

/**
 * Get all Posts
 */
exports.getAllPosts = (req, res) => {
  Post.model.find().exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    return res.apiResponse(item);
  });
};
