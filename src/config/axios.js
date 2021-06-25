import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const setAuthorizationHeader = token => {
  api.defaults.headers.common['Authorization'] = 'bearer ' + token;
  // axios.defaults.headers.common['Authorization'] = 'bearer ' + token;

  // axios.interceptors.request.use(config => {
  //   config.headers.Authorization = 'bearer ' + token;
  //   return config;
  // });
};

export const request = {
  post: (url, payload) => {
    return api.post(url, payload);
  }
};
