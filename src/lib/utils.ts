import { clsx, type ClassValue } from 'clsx';
import jwt from 'jsonwebtoken';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { EntityError } from '~/lib/https';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError
}: {
  error: any;
  setError?: UseFormSetError<any>;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors?.forEach(
      (item: { field: string; message: string }) => {
        setError(item?.field, {
          type: 'server',
          message: item?.message
        });
      }
    );
  }
};

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};
