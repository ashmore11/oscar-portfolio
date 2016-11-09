import React, { PropTypes } from 'react';

export default function TagList({ tags }) {
  return (
    <ul className="TagList">
      {tags.map((tag) => (
        <li
          key={tag._id}
          data-slug={tag.slug}
          className="TagList-item"
        >
          {tag.tag}
        </li>
      ))}
    </ul>
  );
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
};
