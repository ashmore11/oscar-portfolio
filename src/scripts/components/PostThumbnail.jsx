import React, { Component, PropTypes } from 'react';

export default class Posts extends Component {
  static propTypes = {
    staticImage: PropTypes.string.isRequired,
    animatedImage: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.onMouseEnter = ::this.onMouseEnter;
    this.onMouseLeave = ::this.onMouseLeave;
  }

  onMouseEnter() {
    this.refs.PostThumbnail.classList.add('is-active');
  }

  onMouseLeave() {
    this.refs.PostThumbnail.classList.remove('is-active');
  }

  render() {
    const { staticImage, animatedImage } = this.props;

    return (
      <div
        ref="PostThumbnail"
        className="PostThumbnail"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <img
          className="PostThumbnail--static"
          src={staticImage}
          alt=""
        />
        <img
          className="PostThumbnail--animated"
          src={animatedImage}
          alt=""
        />
      </div>
    );
  }
}
