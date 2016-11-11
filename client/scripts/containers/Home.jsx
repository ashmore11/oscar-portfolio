import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import TagList from '../components/TagList';
import PostList from '../components/PostList';

const mapStateToProps = (state) => ({
  tags: state.tags,
});

function Home({ tags, children }) {
  return (
    <div className="Home">
      {children}
      <TagList tags={tags} />
      <PostList />
    </div>
  );
}

Home.propTypes = {
  children: PropTypes.element,
  tags: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Home);
