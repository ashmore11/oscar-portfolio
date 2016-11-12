import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { setActiveTag } from '../actions/navigation';

const mapStateToProps = (state) => ({
  activeTag: state.navigation.activeTag,
});

const mapDispatchToProps = (dispatch) => ({
  onSetActiveTag(tag) {
    dispatch(setActiveTag(tag));
  },
});

@connect(mapStateToProps, mapDispatchToProps)

export default class TagList extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    activeTag: PropTypes.string.isRequired,
    onSetActiveTag: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.tagClicked = ::this.tagClicked;
  }

  tagClicked(event) {
    event.persist();

    const selectedTag = event.target.dataset.slug;
    this.props.onSetActiveTag(selectedTag);
  }

  render() {
    const { tags } = this.props;

    return (
      <ul className="TagList">
        {tags.map((tag) => (
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
