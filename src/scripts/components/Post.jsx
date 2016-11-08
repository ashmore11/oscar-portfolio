import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
  post: state.posts.find(post => post.slug === props.params.postId),
});

@connect(mapStateToProps)

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    console.log(this.props.post);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="Post">
        <h2>Post: {post.title}</h2>
      </div>
    );
  }
}
