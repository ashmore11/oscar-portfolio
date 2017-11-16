import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import TagList from '../components/TagList';
import PostList from '../components/PostList';

require('../../styles/main');

function App({ tags, children }) {
  return (
    <div className="App">
      <Helmet
        title="Portfolio"
        titleTemplate="Oscar Granse - %s"
        meta={[
          { name: 'description', content: 'Helmet application' },
          { property: 'og:url', content: 'http://www.oscargran.se/' },
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: 'Oscar Granse - Portfolio' },
          { property: 'og:description', content: 'The portfolio of Oscar Granse!' },
          { property: 'og:image', content: 'http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg' },
        ]}
      />
      <Link to="/">
        <img className="Logo" src={require('../../images/logo')} alt="" />
      </Link>
      {children}
      <TagList tags={tags} />
      <PostList />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
  tags: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tags: state.tags,
});

export default connect(mapStateToProps)(App);
