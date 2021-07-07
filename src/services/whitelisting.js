import { request } from '../config/axios';
import Utils from '../lib/utils';

const getEntries = params => {
  const url = 'v2/whitelist-entries';
  return request.get(url, params).then(response => {
    const { error, data } = response.data;
    if (error) {
      throw new Error(Utils.parseApiError(error));
    } else return data;
  });
};

const updateEntryStatus = (entryId, status) => {
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
  getEntries,
  updateEntryStatus
};