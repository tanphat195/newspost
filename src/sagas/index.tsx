import { all, fork } from 'redux-saga/effects';
import { watchSignUpAsync, watchSignInAsync, watchFetchUserAsync, watchSignOutAsync } from './userSaga';

export default function* () {
  yield all([
    fork(watchSignUpAsync),
    fork(watchSignInAsync),
    fork(watchFetchUserAsync),
    fork(watchSignOutAsync),
  ])
};