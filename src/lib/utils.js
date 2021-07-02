import _ from 'lodash';

export default class Utils {
  static parseApiError(error) {
    if (!error) return null;
    const defMsg = typeof error === 'string' ? error : 'Something went wrong';
    const errMsg = _.get(error, 'message', null);
    const resErr = _.get(error, 'response.data.error', null);
    const resErrMsg = _.get(error, 'response.data.error.message', null);
    return resErrMsg || resErr || errMsg || defMsg;
  }

  static getUrlParameters (queryParams, addPagination) {
    const limit = 10;
    if (addPagination) {
      if (queryParams) {
        if (!queryParams.offset) {
          queryParams.offset = 0;
        }
        if (!queryParams.limit) {
          queryParams.limit = limit;
        }
      } else {
        queryParams = {
          offset: 0,
          limit
        };
      }
    }
  
    let urlParams = '';
    let join = '?'
    Object.keys(queryParams).forEach(i => {
      if(queryParams[i]){
        urlParams += `${join}${i}=${queryParams[i]}`;
        join = '&';
      }
    });
    return urlParams;
  }
}
