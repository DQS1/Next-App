import { all } from 'redux-saga/effects';
import { registerWatcher } from '~/features/register/registerSaga';

export function* rootSaga() {
  yield all([...registerWatcher]);
}
