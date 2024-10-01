// frontend/src/axiosInstance.js

import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Authorization': localStorage.getItem('access_token')
      ? 'Bearer ' + localStorage.getItem('access_token')
      : null,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config.url !== '/api/token/' &&
      error.config.url !== '/api/token/refresh/'
    ) {
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('access_token', response.data.access);
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        // Redirect to login page or handle token refresh failure
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
