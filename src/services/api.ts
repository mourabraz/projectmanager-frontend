/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { getRefreshToken, getUser } from './localStorage';
import singletonFunctions from './singletonFunctions';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://apipm.mourabraz.com/'
      : 'http://127.0.0.1:3333',
});

/*
 * add delay for all requests, only for development purposes
 */
if (process.env.NODE_ENV !== 'production') {
  api.interceptors.request.use(
    (config) =>
      new Promise((resolve) => setTimeout(() => resolve(config), 500)),
  );
}

const interceptor = api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const refreshToken = getRefreshToken();
    const user = getUser();

    if (originalRequest._tryRefresh) {
      api.interceptors.response.eject(interceptor);
    }

    if (user && err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        api.defaults.headers.Authorization = `Bearer ${refreshToken}`;
        const responseRetry = await api.post('auth/refresh', {
          email: user.email,
        });
        singletonFunctions.saveCredentials(responseRetry.data);
        originalRequest.headers.Authorization = `Bearer ${responseRetry.data.accessToken}`;

        return api.request(originalRequest);
      } catch (err2) {
        singletonFunctions.signOut();

        return Promise.reject(err);
      }
    }

    if (user && err.response.status === 401 && originalRequest._retry) {
      singletonFunctions.signOut();
    }

    return Promise.reject(err);
  },
);

api.interceptors.request.use((config: any) => {
  return new Promise((resolve) => {
    if (config.url === 'auth/refresh') {
      config._tryRefresh = true;
    }

    return resolve(config);
  });
});

export default api;
