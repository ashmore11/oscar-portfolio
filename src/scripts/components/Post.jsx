import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

function Post({ post }) {
  return (
    <div className="Post">
      <Helmet
        title={post.title}
        meta={[
          { name: 'description', content: post.description },
          { property: 'og:url', content: `http://www.oscargran.se/${post.slug}` },
          { property: 'og:title', content: `Oscar Granse - ${post.title}` },
          { property: 'og:description', content: post.description },
          { property: 'og:image', content: post.image.url },
        ]}
      />
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
