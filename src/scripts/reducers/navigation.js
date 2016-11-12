import { SET_ACTIVE_TAG } from '../constants';

const initialState = {
  activeTag: 'all',
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAG:
      return {
        ...state,
        activeTag: action.payload,
      };
    default:
      return state;
  }
};

export default navigation;
