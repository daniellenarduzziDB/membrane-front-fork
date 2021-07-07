import { memo, useState, useEffect } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import getColumnSettings from './columnSettings';

//hooks
import useWhitelisting from '../../../../../hooks/useWhitelisting';

//components
import NoEntries from '../../NoEntries';
import Pagination from '../../../../../components/Pagination';
import Table from '../../../../../components/Table';

//styles
import * as styles from './styles.module.scss';

export default memo(function Whitelist() {
  //bind styles
  classnames.bind(styles);

  //hook user
  const { 
    fetchEntries,
    changeEntryStatus,
    fetchingEntries,
    entries,
    totalEntries 
  } = useWhitelisting();

  //states
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  //effects
  useEffect(() => {
    if (!fetchingEntries) {
      fetchEntries({
        offset: (pageNumber-1)*itemsPerPage,
        limit: itemsPerPage
      });
    }
  }, [fetchEntries, pageNumber, itemsPerPage]);

  //functions
  const onItemsPerPageChange = (ipp) => {
    setPageNumber(1);
    setItemsPerPage(ipp);
  };

  const onPageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const onChangeStatus = (entryId, allowed) => {
    const status = allowed? 'active':'disabled';
    changeEntryStatus(entryId, status);
  }

  return (
    <div className={styles.whitelist}>
      {
        fetchingEntries || entries.length > 0 ?
        <>
          <Table
            loading={fetchingEntries}
            columnSettings={getColumnSettings(onChangeStatus)} 
            data={entries}
          />
          <Pagination
            loading={fetchingEntries}
            itemsPerPage={itemsPerPage}
            currentPageNumber={pageNumber}
            onItemsPerPageChange={onItemsPerPageChange}
            onSetPage={onPageChange}
            totalItems={totalEntries}
          />
        </>
        :
        <NoEntries
          heading='There are no users added yet.'
          message='Add users to start trading!'
        />
      }
    </div>
  );
});
