import React, { PropTypes } from 'react';

export default function Tag({ slug, tag }) {
  return (
    <li data-slug={slug} className="Tag">{tag}</li>
  );
}

Tag.propTypes = {
  slug: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
