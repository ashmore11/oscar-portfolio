import { SET_ACTIVE_TAG } from 'app/constants';

export function setActiveTag(tag) {
  return {
    type: SET_ACTIVE_TAG,
    payload: tag,
  };
}
