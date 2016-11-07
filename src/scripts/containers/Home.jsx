import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  posts: state.posts,
  tags: state.tags,
});

@connect(mapStateToProps)

export default class Home extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.tagClicked = ::this.tagClicked;
  }

  tagClicked(event) {
    console.log(event);
  }

  render() {
    const { posts, tags } = this.props;
    return (
      <div className="Home">
        <h2>Home</h2>
        <h3>TAGS</h3>
        <ul>{tags.map(tag => (
          <li key={tag._id} onClick={this.tagClicked}>{tag.tag}</li>
        ))}</ul>
        <h3>POSTS</h3>
        <ul>{posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}</ul>
      </div>
    );
  }
}
