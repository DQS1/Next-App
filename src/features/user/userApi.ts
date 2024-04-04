/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { axiosInstance } from '~/configs/axios.config';
import http from '~/lib/https';
import { AccountResType } from '~/schemaValidations/account.schema';

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
  }
};

export { userApi };
