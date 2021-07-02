import { request } from '../config/axios';
import Utils from '../lib/utils';

const fetchEntries = queryParams => {
  const url = 'v2/whitelist-entries';
  const urlParameters = Utils.getUrlParameters(queryParams);
  return request.get(`${url}${urlParameters}`).then(response => {
    const { error, data } = response.data;
    if (error) {
      throw new Error(Utils.parseApiError(error));
    } else return data;
  });
};

const changeEntryStatus = (entryId, status) => {
  const url = `v2/whitelist-entries/${entryId}`;
  const payload = {
    actions: [{ action: "changeStatus", status }]
  };
  return request.post(url, payload).then(response => {
    const { error, data } = response.data;
    if (error) {
      throw new Error(Utils.parseApiError(error));
    } else return data;
  });
};

export { 
  fetchEntries,
  changeEntryStatus
};