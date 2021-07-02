import { request } from '../config/axios';
import Utils from '../lib/utils';

const getCountries = () => {
  return request.get('countries').then(response => {
    const { error, data } = response.data;
    // if (error) {
    //   throw new Error(Utils.parseApiError(error));
    // } else return data;
    if (error) {
      console.error(Utils.parseApiError(error));
      return [];
    } else return data;
  });
};

export { getCountries };
