var keystone = require('keystone');

var Post = keystone.list('Post');

/**
 * Get Post by ID
 */
exports.get = function(req, res) {

  Post.model.findOne({ slug: req.params.id }).exec(function(err, item) {
    
    if(err) {
      return res.apiError('database error', err);
    }

    if(!item) {
      return res.apiError('not found');
    }
    
    var post = {
      post: item
    }

    res.apiResponse(post);
    
  });

}