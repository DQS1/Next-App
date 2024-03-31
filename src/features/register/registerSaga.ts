/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from 'redux-saga/effects';
import { registerAction } from './registerSlice';
import { homeApi } from './registerApi';

type ActionType = {
  type: string;
  payload: any;
};

export function* registerAccountWorker({ payload }: ActionType): Generator {
  try {
    const response = yield call(homeApi.getUserBySearch, payload);
    yield put(registerAction.registerAccountSuccess(response));
  } catch (error) {
    yield put(registerAction.registerAccountFailure());
    console.log(error);
  }
}

export const registerWatcher = [
  takeEvery(registerAction.registerAccount, registerAccountWorker)
];
