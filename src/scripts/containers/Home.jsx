import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';

import Tags from 'components/Tags';
import PostList from 'components/PostList';
import Post from 'components/Post';

const mapStateToProps = (state) => ({
  posts: state.posts,
  tags: state.tags,
});

function Home({ posts, tags }) {
  return (
    <div className="Home">
      <Match pattern={'/work/:postId'} component={Post} />

      <Tags tags={tags} />
      <PostList posts={posts} />
    </div>
  );
}

Home.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Home);
