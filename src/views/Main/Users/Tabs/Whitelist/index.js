import { memo, useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

//styles
import * as styles from './styles.module.scss';

//components
import Pagination from '../../../../../components/Pagination';
import Table from '../../../../../components/Table';

export default memo(function Whitelist() {
  //bind styles
  classnames.bind(styles);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortingColumn, setSortingColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const onItemsPerPageChange = (ipp) => {
    setPageNumber(1);
    setItemsPerPage(ipp);
  }

  const columnsSettings = [
    {
      key: 'id',
      field: 'settlementCicleId',
      sortable: true,
      label: 'ID'
    },
    {
      key: 'createdAt',
      label: 'created on',
      sortable: true,
      style: { whiteSpace: 'normal' }
    },
    {
      key: 'settlement',
      label: 'settlement',
      cellTemplate: cellData => {
        let tradeName = _.get(cellData, `counterparty.tradeName`, '');
        if (tradeName) return `Settlement with ${tradeName}`;
      }
    },
    {
      key: 'pastDue',
      label: 'Past due',
      cellTemplate: cellData => {
        if (cellData.status === 0) {

          return (
            <span className="table-col-settlement-pastdue">
              Some custom data here
            </span>
          );
        }
      }
    },
    {
      key: 'status',
      label: 'status',
      cellTemplate: cellData => {
        let status;
        switch (cellData.status) {
          case 0:
            status = 'ACTION PENDING';
            break;
          case 1:
            status = 'PROCESSING';
            break;
          case 2:
            status = 'COMPLETE';
            break;
          default:
            break;
        }
        return <span>{status}</span>;
      }
    }
  ];

  const rowDetailRenderer = (rowData) => {
    const td = _.get(rowData, `counterparty.tradeName`, '');
    return (
      <div>
        The counterparty trade name is {td}
        {`\n2020-06-15\n15:10 HS\nmore custom data`}
      </div>
    )
  }

  const onSort = (field) => {
    if (field === sortingColumn) {
      const newDir = sortDirection === 'asc'? 'desc':'asc';
      setSortDirection(newDir);
    } else {
      setSortingColumn(field);
      setSortDirection('asc');
    }
  };

  const data = [
    {"settlementCicleId":"49","createdAt":"2021-06-29T20:25:40.757Z","status":0,"totalSettlementsInCicle":3,"granularStatus":{"pendingAction":1,"processing":2,"complete":0},"counterparty":{"id":69,"tradeName":"Pablo Test001"}},
    {"settlementCicleId":"49","createdAt":"2021-06-29T20:25:40.757Z","status":0,"totalSettlementsInCicle":3,"granularStatus":{"pendingAction":1,"processing":2,"complete":0},"counterparty":{"id":69,"tradeName":"Pablo Test001"}},
    {"settlementCicleId":"49","createdAt":"2021-06-29T20:25:40.757Z","status":0,"totalSettlementsInCicle":3,"granularStatus":{"pendingAction":1,"processing":2,"complete":0},"counterparty":{"id":69,"tradeName":"Pablo Test001"}},
  ];

  return (
    <div className={styles.whitelist}>
      <div>
        <Table 
          columnSettings={columnsSettings} 
          data={data}
          rowDetailRenderer={rowDetailRenderer}
          onSort={onSort}
          sortingColumn={sortingColumn}
          sortDirection={sortDirection}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPageNumber={pageNumber}
          onItemsPerPageChange={onItemsPerPageChange}
          onSetPage={(pn) => {setPageNumber(pn)}}
          totalItems={78}
        />
      </div>
    </div>
  );
});
