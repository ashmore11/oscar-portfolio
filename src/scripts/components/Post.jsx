import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function Post({ post }) {
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

const mapStateToProps = (state, props) => ({
  post: state.posts.find(post => post.slug === props.params.postId),
});

export default connect(mapStateToProps)(Post);
