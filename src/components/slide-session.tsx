'use client';

import { useEffect } from 'react';
import { authApi } from '~/features/auth/authApi';
import { clientSessionToken } from '~/lib/https';
import { differenceInHours } from 'date-fns';
import { useAppDispatch } from '~/hooks/useAppDispatch';

function SlideSession() {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const now = new Date();
        const expiresAt = new Date(clientSessionToken.expiresAt);
        if (differenceInHours(expiresAt, now) < 1) {
          const res = await authApi.slideSessionFromNextClientToNextServer();
          clientSessionToken.expiresAt = res?.payload?.data?.expiresAt;
        }
      },
      1000 * 60 * 60
    );
    return clearInterval(interval);
  });

  return null;
}

export default SlideSession;
