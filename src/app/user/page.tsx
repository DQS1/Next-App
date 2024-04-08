import { cookies } from 'next/headers';
import ProfileForm from '~/app/user/profile-form';
import { userApi } from '~/features/user/userApi';

async function userProfile() {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get('sessionToken');
  const result = await userApi.getUser(sessionToken?.value ?? '');
  return (
    <div>
      <ProfileForm profile={result.payload.data} />
    </div>
  );
}

export default userProfile;
