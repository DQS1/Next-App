'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { call, put, takeEvery } from 'redux-saga/effects';
import { userApi } from '~/features/user/userApi';
import { userAction } from '~/features/user/userSlice';
import {
  showErrorNotification,
  showSuccessNotification
} from '~/utils/notification';

type ActionType = {
  type: string;
  payload: any;
};

export function* getUserWorker(): Generator {
  try {
    const response: any = yield call(userApi.getUserClient);
    yield put(userAction.getUserSuccess(response?.payload?.data));
  } catch (error: any) {
    yield put(userAction.getUserFailure());
    showErrorNotification('Không nhận được thông tin người dùng');
    console.log(error);
  }
}

export function* updateUserWorker({ payload }: ActionType): Generator {
  try {
    const values = payload.values;
    const response: any = yield call(userApi.updateUser, values);
    if (response.status === 200) {
      yield put(userAction.updateUserSuccess());
      showSuccessNotification(response.payload.message);
      payload?.onSuccess();
    }
  } catch (error: any) {
    yield put(userAction.updateUserFailure());
    showErrorNotification('Cập nhật thất bại');
    console.log(error);
  }
}

export const productWatcher = [
  takeEvery(userAction.getUser, getUserWorker),
  takeEvery(userAction.updateUser, updateUserWorker)
];
