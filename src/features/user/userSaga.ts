'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { call, put, takeEvery } from 'redux-saga/effects';
import { userApi } from '~/features/user/userApi';
import { userAction } from '~/features/user/userSlice';

type ActionType = {
  type: string;
  payload: any;
};

export function* getUserWorker(): Generator {
  try {
    const response: any = yield call(userApi.getUserClient);
    yield put(userAction.getUserSuccess(response?.payload?.data));
  } catch (error: any) {
    yield put(userAction.getUserFailure(error?.response?.data));
    console.log(error);
  }
}

export const userWatcher = [takeEvery(userAction.getUser, getUserWorker)];