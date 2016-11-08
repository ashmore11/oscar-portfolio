import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Posts({ posts }) {
  return (
    <div className="Posts">
      <ul>{posts.map(({ _id, slug, title }) => (
        <li key={_id} className="Post">
          <Link to={`/work/${slug}`}>{title}</Link>
        </li>
      ))}</ul>
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};
