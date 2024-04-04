import { authReducer } from '~/features/auth/authSlice';
import { userReducer } from '~/features/user/userSlice';

export const rootReducer = {
  auth: authReducer,
  user: userReducer
};
