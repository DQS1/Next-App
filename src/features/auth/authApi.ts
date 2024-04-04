/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/lib/https';
import {
  LoginBodyType,
  RegisterBodyType
} from '~/schemaValidations/auth.schema';

type LoginData = {
  token: string;
  expiration: string;
};

const authApi = {
  loginAccount: async (payload: LoginBodyType) => {
    console.log('🚀 ~ loginAccount: ~ payload:', payload);
    const url = `/auth/login`;
    const response = await http.post(url, payload);
    return response;
  },
  setToken: async (payload: LoginData): Promise<any> => {
    const url = '/api/auth';
    const body = {
      sessionToken: payload?.token
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
  }
};

export { authApi };
