'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { call, put, takeEvery } from 'redux-saga/effects';
import { authAction } from './authSlice';
import { authApi } from './authApi';
import {} from '~/utils/notification';
import { showSuccessNotification } from '~/utils/notification';

type ActionType = {
  type: string;
  payload: any;
};

type ErrorType = {
  status: number;
  payload: any;
};

type loginToken = {
  token: string;
  expiration: string;
};

export function* loginWorker({ payload }: ActionType): Generator {
  try {
    const values = payload.values;
    const response: any = yield call(authApi.loginAccount, values);
    if (response.status === 200) {
      yield put(authAction.loginSuccess(response));
      showSuccessNotification('Đăng nhập thành công');
      yield setTokenWorker(response);
      payload.onSuccess();
    }
  } catch (error: any) {
    yield put(authAction.loginFailure(error));
    console.log(error);
  }
}

export function* setTokenWorker(payload: any): Generator {
  try {
    const loginToken: loginToken = {
      token: payload?.payload?.data?.token,
      expiration: payload?.payload?.data?.expiresAt
    };
    console.log(
      '🚀 ~ function*setTokenWorker ~ loginToken?.token:',
      loginToken?.token
    );
    yield call(authApi.setToken, loginToken);
  } catch (error: any) {
    console.log(error);
  }
}

export function* registerAccountWorker({ payload }: ActionType): Generator {
  try {
    const values = payload.values;
    const response: any = yield call(authApi.registerAccount, values);
    if (response.status === 200) {
      yield put(authAction.loginSuccess(response));
      showSuccessNotification('Đăng kí thành công');
      yield setTokenWorker(response);
      payload.onSuccess();
    }
  } catch (error: any) {
    console.log('🚀 ~ function*registerAccountWorker ~ error:', error);
    yield put(authAction.registerAccountFailure(error));
    console.log(error);
  }
}

export const authWatcher = [
  takeEvery(authAction.login, loginWorker),
  takeEvery(authAction.registerAccount, registerAccountWorker)
];
