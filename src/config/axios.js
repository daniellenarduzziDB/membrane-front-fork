import axios from 'axios';

export const setAuthorizationHeader = token => {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = 'bearer ' + token;
    return config;
  });
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const request = {
  post: (url, payload) => {
    return api.post(url, payload);
  }
};
