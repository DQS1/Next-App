import { cookies } from 'next/headers';
import { authApi } from '~/features/auth/authApi';
import { HttpError } from '~/lib/https';

export async function POST(request: Request) {
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
    const res = await authApi.slideSessionFromNextServerToServer(
      sessionToken.value
    );
    const newExpiresDate = new Date(
      res?.payload?.data?.expiresAt
    ).toUTCString();
    return Response.json(res, {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken?.value}; Path=/; HttpOnly; Expires=${newExpiresDate}; SameSite=Lax; Secure`
      }
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      });
    } else {
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
}
