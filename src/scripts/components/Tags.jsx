import React, { PropTypes } from 'react';

import Tag from 'components/Tag';

export default function Tags({ tags }) {
  return (
    <ul>{tags.map(({ _id, slug, tag }) => (
      <Tag
        key={_id}
        slug={slug}
        tag={tag}
      />
    ))}</ul>
  );
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
};
