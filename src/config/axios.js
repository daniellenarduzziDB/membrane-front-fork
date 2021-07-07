import axios from 'axios';
import Utils from '../lib/utils';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('auth-token');
  if (token) config.headers.Authorization = 'bearer ' + token;
  return config;
});

export const setAuthorizationHeader = token => {
  api.defaults.headers.common['Authorization'] = 'bearer ' + token;
};

export const request = {
  get: (url, payload) => {
    return api.get(url.concat(Utils.convertToQueryParameters(payload)));
  },
  post: (url, payload) => {
    return api.post(url, payload);
  }
};
