import { request } from '../config/axios';
import Utils from '../lib/utils';

const login = payload => {
  return request.post('v2/login', payload).then(response => {
    const { error, data } = response.data;
    if (error) {
      throw new Error(Utils.parseApiError(error));
    } else return data;
  });
};

const loginTwoFactor = payload => {
  return request.post('v2/two-steps-auth/verify', payload).then(response => {
    const { error, data } = response.data;
    if (error) {
      throw new Error(Utils.parseApiError(error));
    } else return data;
  });
};

const requestNewCode = () => {
  return request.post('v2/two-steps-auth/generate').then(response => {
    const { error, data } = response.data;
    if (error) {
      throw new Error(Utils.parseApiError(error));
    } else return data;
  });
};

const isLoggedIn = () => {
  const token = sessionStorage.getItem('auth-token');
  return !!token;
};

export { login, loginTwoFactor, requestNewCode, isLoggedIn };
