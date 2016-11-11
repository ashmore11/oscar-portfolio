import keystone from 'keystone';
import { createStore, combineReducers } from 'redux';

import posts from '../../client/scripts/reducers/posts';
import tags from '../../client/scripts/reducers/tags';
import navigation from '../../client/scripts/reducers/navigation';

module.exports = async function handleRender(req, res) {
  const Post = keystone.list('Post');
  const Tags = keystone.list('Tags');

  const reducer = combineReducers({
    posts,
    tags,
    navigation,
  });

  const initialState = {
    posts: await Post.model.find({ state: 'published' }).exec(),
    tags: await Tags.model.find().exec(),
  };

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();

  res.render('index', { preloadedState });
};
