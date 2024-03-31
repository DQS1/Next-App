import axios from 'axios';
import envConfig from '~/configs/env.config';

export const BASEURL = envConfig.NEXT_PUBLIC_API_ENDPOINT;

export const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 1000
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
