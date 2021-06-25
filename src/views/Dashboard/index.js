import { memo, useEffect, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import Frame from '../../components/Frame';
import Pagination from '../../components/Pagination';

export default memo(function Dashboard() {
  //bind styles
  classnames.bind(styles);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const onItemsPerPageChange = (ipp) => {
    setPageNumber(1);
    setItemsPerPage(ipp);
  }

  return (
    <div className={styles.dashboard}>
      <Frame />
      <Pagination
        itemsPerPage={itemsPerPage}
        currentPageNumber={pageNumber}
        onItemsPerPageChange={onItemsPerPageChange}
        onSetPage={(pn) => {setPageNumber(pn)}}
        totalItems={78}
      />
    </div>
  );
});
