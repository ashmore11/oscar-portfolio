import { GET_POST_BY_ID } from '../constants';

const posts = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_BY_ID:
      return state.find(post => action.id === post.id);
    default:
      return state;
  }
};

export default posts;
