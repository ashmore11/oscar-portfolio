import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import PostThumbnail from 'components/PostThumbnail';

function PostList({ posts }) {
  return (
    <ul className="PostList">
      {posts.map(({ _id, slug, image, animatedGif }) => (
        <li
          key={_id}
          className="PostList-item"
        >
          <Link to={`/${slug}`}>
            <PostThumbnail
              staticImage={image.url}
              animatedImage={animatedGif.url}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const activeTag = state.tags.find(tag => tag.slug === state.navigation.activeTag);
  const filteredPosts = state.posts.filter(post => post.tags.includes(activeTag._id));

  return {
    posts: activeTag.slug === 'all' ? state.posts : filteredPosts,
  };
};

export default connect(mapStateToProps)(PostList);
