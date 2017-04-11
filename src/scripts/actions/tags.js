import {
  GET_TAG_BY_SLUG,
  SET_ACTIVE_TAG,
} from '../constants';

export function getTagBySlug() {
  return {
    type: GET_TAG_BY_SLUG,
  };
}

export function setActiveTag(tag) {
  return {
    type: SET_ACTIVE_TAG,
    payload: tag,
  };
}
