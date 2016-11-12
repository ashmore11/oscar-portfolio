import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import TagList from '../components/TagList';
import PostList from '../components/PostList';

function App({ tags, children }) {
  return (
    <div className="App">
      {children}
      <TagList tags={tags} />
      <PostList />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
  tags: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tags: state.tags,
});

export default connect(mapStateToProps)(App);
