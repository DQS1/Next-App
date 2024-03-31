/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

type stateType = {
  searchUserLoading: boolean;
  searchUserLoadingResponse: any;
};

const initialState: stateType = {
  searchUserLoading: false,
  searchUserLoadingResponse: null
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerAccount(state, _payload) {
      state.searchUserLoading = true;
    },
    registerAccountSuccess(state, { payload }) {
      state.searchUserLoading = false;
      state.searchUserLoadingResponse = payload?.data;
    },
    registerAccountFailure(state) {
      state.searchUserLoading = false;
    }
  }
});

const { actions, reducer } = registerSlice;

export { actions as registerAction, reducer as registerReducer };
