import axios from 'axios';
import { AuthResponse } from '~/models/response/auth-response';
import { BASE_URL } from '../constants/namings';

export const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.log(error.config);
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config?._isRetry) {
      error.config._isRetry = true;
      try {
        const { data } = await axios.get<AuthResponse>(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log('UNAUTHORIZED USER' + error);
      }
    }
    throw error;
  },
);
