import axios from 'axios';

export const setAuthorizationHeader = token => {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = 'bearer ' + token;
    return config;
  });
};
