import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from 'actions/count';

const mapStateToProps = (state) => ({
  count: state.count,
  posts: state.posts,
  tags: state.tags,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => {
    dispatch(increment());
  },
  onDecrement: () => {
    dispatch(decrement());
  },
});

@connect(mapStateToProps, mapDispatchToProps)

export default class Home extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    posts: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.buttonClicked = ::this.buttonClicked;
  }

  buttonClicked(event) {
    const { onIncrement, onDecrement } = this.props;
    if (event.target.id === 'increment') {
      onIncrement();
    } else {
      onDecrement();
    }
  }

  render() {
    const { count, posts, tags } = this.props;
    console.log(tags);
    return (
      <div className="Home">
        <h2>Home</h2>
        <span>Count: {count}</span>
        <button id="increment" onClick={this.buttonClicked}>INCREMENT</button>
        <button id="decrement" onClick={this.buttonClicked}>DECREMENT</button>
        <h1>TAGS</h1>
        <ul>{tags.map(tag => (
          <li key={tag._id}>{tag.tag}</li>
        ))}</ul>
        <h1>POSTS</h1>
        <ul>{posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}</ul>
      </div>
    );
  }
}
