/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { axiosInstance } from '~/configs/axios.config';

const homeApi = {
  getUserBySearch: async (payload: any): Promise<AxiosResponse<any, any>> => {
    console.log('🚀 ~ getUserBySearch: ~ payload:', payload);
    const url = `/auth/register`;
    const response: AxiosResponse = await axiosInstance.post<any>(url, payload);
    return response;
  }
};

export { homeApi };
