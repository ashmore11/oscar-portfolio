var keystone = require('keystone');
var Post = keystone.list('Post');

/**
 * Get Post by Slug
 */
exports.getPostById = function(req, res) {
  Post.model.findOne({ slug: req.params.slug }).exec(function(err, item) {
    if(err) return res.apiError('database error', err);
    if(!item) return res.apiError('not found');
    
    var post = { post: item };
    res.apiResponse(post);
  });
}

exports.getAllPosts = function(req, res) {
  Post.model.find().exec(function(err, item) {
    if(err) return res.apiError('database error', err);
    if(!item) return res.apiError('not found');
    
    res.apiResponse(item);
  }); 
}