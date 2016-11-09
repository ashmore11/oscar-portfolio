import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import PostThumbnail from 'components/PostThumbnail';

export default function PostList({ posts }) {
  return (
    <ul className="PostList">
      {posts.map(({ _id, slug, image, animatedGif }) => (
        <li key={_id} className="PostList-item">
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
