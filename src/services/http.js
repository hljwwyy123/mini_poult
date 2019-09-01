import axios from 'axios';

const baseURL = '';

const instance = axios.create({
  baseURL,
  timeout: 1000,
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
