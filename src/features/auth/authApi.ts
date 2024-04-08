/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/lib/https';
import {
  LoginBodyType,
  RegisterBodyType,
  SlideSessionResType
} from '~/schemaValidations/auth.schema';
import { MessageResType } from '~/schemaValidations/common.schema';

type LoginData = {
  token: string;
  expiresAt: string;
};

const authApi = {
  loginAccount: async (payload: LoginBodyType) => {
    const url = `/auth/login`;
    const response = await http.post(url, payload);
    return response;
  },
  auth: async (payload: LoginData): Promise<any> => {
    const url = '/api/auth';
    const body = {
      sessionToken: payload?.token,
      expiresAt: payload?.expiresAt
    };
    const response = await http.post(url, body, {
      baseUrl: ''
    });
    return response;
  },
  registerAccount: async (payload: RegisterBodyType) => {
    const url = `/auth/register`;
    const response = await http.post<RegisterBodyType>(url, payload);
    return response;
  },
  logoutFromNextServerToServer: async (payload: string) => {
    const url = `/auth/logout`;
    const response = await http.post<MessageResType>(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${payload}`
        }
      }
    );
    return response;
  },
  logoutFromNextClientToNextServer: async (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) => {
    const url = '/api/auth/logout';
    const response = await http.post<MessageResType>(
      url,
      {
        force
      },
      {
        baseUrl: '',
        signal
      }
    );
    return response;
  },
  slideSessionFromNextServerToServer: (sessionToken: string) => {
    const url = '/auth/slide-session';
    const config = {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    };
    const response = http.post<SlideSessionResType>(url, {}, config);
    return response;
  },
  slideSessionFromNextClientToNextServer: () => {
    const url = '/api/auth/slide-session';
    const response = http.post<SlideSessionResType>(
      url,
      {},
      {
        baseUrl: ''
      }
    );
    return response;
  }
};

export { authApi };
