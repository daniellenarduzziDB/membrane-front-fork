import { useCallback, useState } from 'react';

import { 
  fetchEntries,
  changeEntryStatus
} from '../services/whitelisting';

export default function useUser() {
  const [fetchingEntries, setFetchingEntries] = useState(false);
  const [entries, setEntries] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  const getEntries = useCallback(
    queryParams => {
      setFetchingEntries(true);
      setEntries([]);
      setTotalEntries(0);
      return fetchEntries(queryParams)
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

  const updateEntryStatus = useCallback(
    (entryId, status) => {
      const oldList = [...entries];
      const newList = entries.map(o => {
        return o.id===entryId? {...o, status: status}:o;
      });
      setEntries(newList);
      return changeEntryStatus(entryId, status)
        .catch(error => {
          setEntries(oldList);
          throw new Error(Utils.parseApiError(error));
        });
    },
    []
  );

  return {
    getEntries,
    updateEntryStatus,
    fetchingEntries,
    entries,
    totalEntries
  };
}