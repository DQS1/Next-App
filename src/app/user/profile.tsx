'use client';

import { useEffect } from 'react';
import { userAction } from '~/features/user/userSlice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { RootState } from '~/redux/store';

function Profile() {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(
    (state: RootState) => state?.user?.getUserResponse
  );

  console.log('🚀 ~ Profile ~ userData:', userData);
  useEffect(() => {
    dispatch(userAction.getUser());
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <div>Xin chào {userData?.name} </div>
    </div>
  );
}

export default Profile;
