/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { axiosInstance } from '~/configs/axios.config';
import http from '~/lib/https';
import {
  AccountResType,
  UpdateMeBodyType
} from '~/schemaValidations/account.schema';

const userApi = {
  getUserClient: async () => {
    const url = `/account/me`;
    const response = await http.get<AccountResType>(url);
    return response;
  },
  getUser: async (sessionToken: string) => {
    const url = `/account/me`;
    const response = http.get<AccountResType>(url, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    });
    return response;
  },
  updateUser: async (payload: UpdateMeBodyType) => {
    console.log('🚀 ~ updateUser: ~ payload:', payload);
    const url = `/account/me`;
    const response = http.put(url, payload);
    return response;
  }
};

export { userApi };
