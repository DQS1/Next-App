/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

type stateType = {
  getUserLoading: boolean;
  getUserResponse: any;
};

const initialState: stateType = {
  getUserLoading: false,
  getUserResponse: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state) {
      state.getUserLoading = true;
    },
    getUserSuccess(state, { payload }) {
      state.getUserLoading = false;
      state.getUserResponse = payload;
    },
    getUserFailure(state) {
      state.getUserLoading = false;
    }
  }
});

const { actions, reducer } = userSlice;

export { actions as userAction, reducer as userReducer };
