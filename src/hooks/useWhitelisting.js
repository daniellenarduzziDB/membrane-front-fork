import { useCallback, useState } from 'react';
import Utils from '../lib/utils';

import { 
  getEntries,
  updateEntryStatus
} from '../services/whitelisting';

export default function useWhitelisting() {
  const [fetchingEntries, setFetchingEntries] = useState(false);
  const [entries, setEntries] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  const fetchEntries = useCallback(
    queryParams => {
      setFetchingEntries(true);
      setEntries([]);
      setTotalEntries(0);
      return getEntries(queryParams)
        .then(response => {
          const { entries, totalCount } = response;
          setFetchingEntries(false);
          setEntries(entries || []);
          setTotalEntries(totalCount || 0);
        })
        .catch(error => {
          setFetchingEntries(false);
          throw new Error(Utils.parseApiError(error));
        });
    },
    []
  );

  const changeEntryStatus = useCallback(
    (entryId, status) => {
      const oldList = [...entries];
      const newList = entries.map(o => {
        return o.id===entryId? {...o, status: status}:o;
      });
      setEntries(newList);
      return updateEntryStatus(entryId, status)
        .catch(error => {
          setEntries(oldList);
          throw new Error(Utils.parseApiError(error));
        });
    },
    [entries]
  );

  return {
    fetchEntries,
    changeEntryStatus,
    fetchingEntries,
    entries,
    totalEntries
  };
}