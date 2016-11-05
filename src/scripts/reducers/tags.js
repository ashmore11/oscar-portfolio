import { GET_TAG_BY_SLUG } from '../constants';

const posts = (state = {}, action) => {
  switch (action.type) {
    case GET_TAG_BY_SLUG:
      return state.find(tag => action.id === tag.id);
    default:
      return state;
  }
};

export default posts;
