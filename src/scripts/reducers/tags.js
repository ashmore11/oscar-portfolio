import { SET_ACTIVE_TAG, GET_TAG_BY_SLUG } from '../constants';

const initialState = {
  items: [],
  activeTag: 'all',
};

const tags = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAG_BY_SLUG:
      return state.items.find(tag => action.id === tag.id);
    case SET_ACTIVE_TAG:
      return {
        ...state,
        activeTag: action.payload,
      };
    default:
      return state;
  }
};

export default tags;
