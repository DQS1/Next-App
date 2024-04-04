import { all } from 'redux-saga/effects';
import { authWatcher } from '~/features/auth/authSaga';
import { userWatcher } from '~/features/user/userSaga';

export function* rootSaga() {
  yield all([, ...authWatcher, ...userWatcher]);
}
