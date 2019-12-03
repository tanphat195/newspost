import { all, fork } from 'redux-saga/effects';
import { watchSignUpAsync, watchSignInAsync, watchFetchUserAsync, watchSignOutAsync } from './userSaga';
import { watchGetPosts } from './postSaga';

export default function* () {
  yield all([
    fork(watchSignUpAsync),
    fork(watchSignInAsync),
    fork(watchFetchUserAsync),
    fork(watchSignOutAsync),
    fork(watchGetPosts),
  ]);
};