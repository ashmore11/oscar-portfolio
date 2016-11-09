import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';

import TagList from 'components/TagList';
import PostList from 'components/PostList';
import Post from 'components/Post';

const mapStateToProps = (state) => ({
  posts: state.posts,
  tags: state.tags,
});

function Home({ posts, tags }) {
  return (
    <div className="Home">
      <Match pattern="/:postId" render={(matchProps) => {
        const post = posts.find(p => p.slug === matchProps.params.postId);
        if (!post) {
          return <Redirect to="/" />;
        }
        return <Post post={post} />;
      }}
      />

      <TagList tags={tags} />
      <PostList posts={posts} />
    </div>
  );
}

Home.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Home);
