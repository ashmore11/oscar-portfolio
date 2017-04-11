import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { setActiveTag } from '../actions/tags';

const mapDispatchToProps = (dispatch) => ({
  onSetActiveTag(tag) {
    dispatch(setActiveTag(tag));
  },
});

@connect(null, mapDispatchToProps)

export default class TagList extends Component {
  static propTypes = {
    tags: PropTypes.object.isRequired,
    onSetActiveTag: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.tagClicked = ::this.tagClicked;
  }

  tagClicked(event) {
    event.persist();

    const selectedTag = event.target.dataset.slug;
    const { onSetActiveTag } = this.props;

    onSetActiveTag(selectedTag);
  }

  render() {
    const { tags } = this.props;

    return (
      <ul className="TagList">
        {tags.items.map((tag) => (
          <li
            key={tag._id}
            data-slug={tag.slug}
            onClick={this.tagClicked}
          >
            {tag.tag}
          </li>
        ))}
      </ul>
    );
  }
}
