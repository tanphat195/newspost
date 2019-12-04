import { takeLatest, call, put } from 'redux-saga/effects';
import { POSTS_HOME } from '../reducers/postReducer';
import REST from '../utils/api';

export function* watchGetPosts() {
  yield takeLatest('WATCH_GET_POSTS', workerGetPosts);
}

function* workerGetPosts(action) {
  try {
    const posts = yield call(requestGetPosts);
    if (action.callback) action.callback();
    
    yield put({
      type: POSTS_HOME,
      payload: posts,
    });
  } catch (err) {
    yield put({
      type: POSTS_HOME,
      payload: []
    });
  }
}

const requestGetPosts = () => {
  return REST.get('posts?start=1&end=-1').then(res => res.data.posts).catch(err => ([]))
}