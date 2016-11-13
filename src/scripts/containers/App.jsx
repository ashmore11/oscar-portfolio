import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import TagList from '../components/TagList';
import PostList from '../components/PostList';

function App({ tags, children }) {
  return (
    <div className="App">
      <Helmet title="Oscar Granse - Portfolio" />
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
