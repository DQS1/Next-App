/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

type stateType = {
  loginLoading: boolean;
  LoginResponse: any;

  registerAccountLoading: boolean;
  registerAccountResponse: any;
};

const initialState: stateType = {
  loginLoading: false,
  LoginResponse: null,

  registerAccountLoading: false,
  registerAccountResponse: null
};

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, _payload) {
      state.loginLoading = true;
    },
    loginSuccess(state, { payload }) {
      state.loginLoading = false;
      state.LoginResponse = payload?.data;
    },
    loginFailure(state, { payload }) {
      state.loginLoading = false;
      state.LoginResponse = payload;
    },
    registerAccount(state, _payload) {
      state.registerAccountLoading = true;
    },
    registerAccountSuccess(state, { payload }) {
      state.registerAccountLoading = false;
      state.registerAccountResponse = payload?.data;
    },
    registerAccountFailure(state, { payload }) {
      state.registerAccountLoading = false;
      state.registerAccountResponse = payload;
    }
  }
});

const { actions, reducer } = authSlice;

export { actions as authAction, reducer as authReducer };
