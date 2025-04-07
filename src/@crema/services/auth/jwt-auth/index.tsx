import type { AxiosResponse } from 'axios';
import { environment } from '../../../../envirenement/environnement';
import axios from 'axios';
import { useAuthMethod } from '@crema/hooks/AuthHooks';

const jwtAxios = axios.create({
  baseURL: `${environment._API}`, // YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res: AxiosResponse<any, any>) => res,
  (err: any) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      const { logout } = useAuthMethod();
      logout();
    }
    return Promise.reject(err);
  }
);
export const setAuthToken = (token?: string) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
