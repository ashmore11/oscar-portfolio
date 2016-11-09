import React, { PropTypes } from 'react';

export default function Post({ post }) {
  return (
    <div className="Post">
      <div className="Post-video">
        <iframe src={post.video} frameBorder="0" allowFullScreen />
      </div>
      <div className="Post-info">
        <h1>{post.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: post.description }} />
        <p dangerouslySetInnerHTML={{ __html: post.extraBits }} />
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
