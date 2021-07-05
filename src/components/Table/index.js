import React from 'react';
import { memo, useState } from 'react';
import classnames from 'classnames';
import PropTypes, { func } from 'prop-types';
import _ from 'lodash';

//styles
import * as styles from './styles.module.scss';

//components
import FontAwesomeIcon, {
  faSort as sort,
  faSortUp as sortUp,
  faSortDown as sortDown,
  faChevronDown as arrowDown
} from '../FontAwesomeIcon';

const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') !== -1;

/*
 * columnSettings: [{ key, label, sortable, field, cellTemplate, style }]
 */
function Table({
  columnSettings,
  data,
  loading,
  onRowClicked,
  onSort,
  rowDetailRenderer,
  sortingColumn,
  sortDirection
}) {
  //bind styles
  classnames.bind(styles);
  const [rowClicked, setRowClicked] = useState(-1);

  const renderHeaderCol = (colSetting, idx) => {
    const { key, label, sortable, style } = colSetting;
    const isSorting = key === sortingColumn;
    const colClass = classnames(styles.headerCol, {
      [styles.sortable]: sortable
    });
    const sortClass = classnames(styles.colSort, {
      [styles.asc]: isSorting && sortDirection === 'asc',
      [styles.desc]: isSorting && sortDirection === 'desc'
    });
    const onClick = () => {
      if (sortable && onSort) onSort(key);
    };

    return (
      <th key={idx} style={style}>
        <div className={colClass} onClick={onClick}>
          <div className={styles.colLabel}>
            {label}
          </div>
          {sortable && (
            <div className={sortClass}>
              <FontAwesomeIcon icon={sort} className={styles.sortBg} />
              <FontAwesomeIcon icon={sortUp} className={styles.sortUp} />
              <FontAwesomeIcon icon={sortDown} className={styles.sortDown} />
            </div>
          )}
        </div>
      </th>
    );
  };

  const renderRow = (rowData, idx) => {
    const rowClass = classnames({
      [styles.detailsOpen]: rowClicked === idx,
      [styles.clickableRow]: !!onRowClicked || !!rowDetailRenderer
    });
    const detailColClass = classnames(styles.rowDetailCol, {
      [styles.opened]: rowClicked === idx
    });
    const handleRowClicked = () => {
      if (!!rowDetailRenderer) {
        setRowClicked(rowClicked === idx ? -1 : idx);
      }
      else if (!!onRowClicked) {
        onRowClicked(rowData);
      }
    };

    return (
      <React.Fragment key={idx}>
        <tr
          key={idx}
          className={rowClass}
          onClick={handleRowClicked}>
          {columnSettings.map((colSetting, colIdx) => {
            const { key, field, cellTemplate, style } = colSetting;
            const fieldValue = _.get(rowData, field||key);
            return (
              <td key={colIdx} style={style}>
                <div className={styles.tableCell}>
                  {!!cellTemplate? cellTemplate(rowData):fieldValue}
                </div>
              </td>
            );
          })}
          {!!rowDetailRenderer && (
            <td width="20px" className={detailColClass}>
              <div className={styles.tableCell}>
                <FontAwesomeIcon icon={arrowDown} />
              </div>
            </td>
          )}
        </tr>
        {!!rowDetailRenderer && rowClicked !== -1 && idx === rowClicked && (
          <tr className={styles.rowDetail} >
            <td colSpan={columnSettings.length + 1}>
              <div className={styles.tableCell}>
                {rowDetailRenderer(rowData)}
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }

  const renderTable = () => {
    return (
      <table cellSpacing="0" className={styles.membraneTable}>
        <thead>
          <tr>
            {columnSettings.map(renderHeaderCol)}
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    );
  };

  const rowClass = classnames(styles.tableWrapper, {
    [styles.safariStyle]: isSafari
  });

  return (
    loading? 
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>
    :
    <div className={rowClass}>{renderTable()}</div>
  );
};

//#region props definitions
// default values and types
Table.defaultProps = {
  loading: false
};

Table.propTypes = {
  columnSettings: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onRowClicked: PropTypes.func,
  onSort: PropTypes.func,
  rowDetailRenderer: func,
  sortingColumn: PropTypes.string,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
};
//#endregion

export default memo(Table);
