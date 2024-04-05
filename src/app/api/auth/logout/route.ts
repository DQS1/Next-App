import { HttpError } from '~/lib/https';
import { cookies } from 'next/headers';
import { authApi } from '~/features/auth/authApi';

export async function POST() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  if (!sessionToken) {
    return Response.json(
      { message: 'Không nhận được session token' },
      {
        status: 400
      }
    );
  }

  try {
    const result = await authApi.logoutFromNextServerToServer(
      sessionToken.value
    );
    return Response.json(result.payload, {
      status: 200,
      headers: {
        // Xóa cookie sessionToken
        'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`
      }
    });
  } catch (error) {
    if (error instanceof HttpError) {
    }
    return Response.json(
      {
        message: 'Lỗi không xác định'
      },
      {
        status: 500
      }
    );
  }
}
