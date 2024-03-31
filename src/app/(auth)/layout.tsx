'use client';
import ReduxProvider from '~/redux/redux-provider';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
