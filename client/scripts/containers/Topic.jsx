import React, { PropTypes } from 'react';

export default function Topic({ params }) {
  return (
    <div className="Topic">
      <h3>{params.topicId}</h3>
    </div>
  );
}

Topic.propTypes = {
  params: PropTypes.object.isRequired,
};
