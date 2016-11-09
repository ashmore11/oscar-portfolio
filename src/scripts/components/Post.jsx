import React, { PropTypes, Component } from 'react';

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    console.log(this.props);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="Post">
        <img src={post.image.url} alt="" />
      </div>
    );
  }
}
