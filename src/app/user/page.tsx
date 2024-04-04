import { cookies } from 'next/headers';
import Profile from '~/app/user/profile';

async function userProfile() {
  return (
    <div>
      <Profile />
    </div>
  );
}

export default userProfile;
