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
}
