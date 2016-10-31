import { INCREMENT, DECREMENT } from 'app/constants';

const initialState = 0;

const count = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default count;
