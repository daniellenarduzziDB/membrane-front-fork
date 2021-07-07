import { request } from '../config/axios';
import Utils from '../lib/utils';

const getCountries = () => {
  return request.get('countries').then(response => {
    const { error, data } = response.data;
    if (error) {
      console.error(Utils.parseApiError(error));
      return [];
    } else return data;
  });
};

export { getCountries };
