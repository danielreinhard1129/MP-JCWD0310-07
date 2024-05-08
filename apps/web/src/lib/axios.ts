import axios, { AxiosInstance } from 'axios';
import { appConfig } from '@/utils/config';

const { baseUrl } = appConfig;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
