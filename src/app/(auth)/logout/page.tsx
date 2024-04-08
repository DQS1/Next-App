'use client';

import { clientSessionToken } from '~/lib/https';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { authApi } from '~/features/auth/authApi';

export default function Logout() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get('sessionToken');
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === clientSessionToken.value) {
      authApi
        .logoutFromNextClientToNextServer(true, signal)
        .then((res: any) => {
          router.push(`/login?redirectFrom=${pathname}`);
        });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, router, pathname]);
  return <div>page</div>;
}
