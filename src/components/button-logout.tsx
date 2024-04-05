'use client';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { authApi } from '~/features/auth/authApi';
import { showErrorNotification } from '~/utils/notification';

function ButtonLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authApi.logoutFromNextClientToNextServer();
      router.push('/login');
    } catch (error) {
      showErrorNotification('Lỗi không xác định');
    }
  };
  return (
    <Button size='sm' onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}

export default ButtonLogout;
