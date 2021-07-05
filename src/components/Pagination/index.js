import { memo } from 'react';
import classnames from 'classnames';
import PropTypes, { number } from 'prop-types';

//components
import FontAwesomeIcon, {
  faChevronDown as arrowDown,
  faChevronLeft as arrowLeft,
  faChevronRight as arrowRight,
} from '../FontAwesomeIcon';

//styles
import * as styles from './styles.module.scss';

function Pagination({
  currentPageNumber,
  hideItemsPerPage,
  loading,
  itemsPerPage,
  itemsPerPageOptions,
  onItemsPerPageChange,
  onSetPage,
  totalItems,
  totalPagesShown
}) {
  //bind styles
  classnames.bind(styles);
  
  const renderPages = () => {
    const pagesLength = Math.ceil(totalItems/itemsPerPage);
    let pagesButtons = [];

    for (let i = 1; i <= pagesLength; i++) {
      let className = classnames(styles.pageNumber, {
        [styles.active]: currentPageNumber === i
      });
      pagesButtons.push(
        <div
          key={i}
          className={className}
          onClick={(e) => { onSetPage(i) }} >
          {i}
        </div>
      );
    }

    const totalShown = totalPagesShown;
    const half = Math.floor(totalShown/2);
    let firstIdx = currentPageNumber-half;
    let lastIdx = currentPageNumber+half;
    // special case for odd number of shown pages
    if(totalShown % 2 !== 0) {
      firstIdx -= 1;
    }
    // handle begining and end of list
    if(currentPageNumber <= half){
      firstIdx = 0;
      lastIdx = totalShown;
    } else if (currentPageNumber >= pagesLength-half) {
      firstIdx = Math.max(0, pagesLength-totalShown);
      lastIdx = pagesLength;
    }

    const showPrev = currentPageNumber > 1;
    const showNext = currentPageNumber < pagesLength;

    return (
      <div className={styles.paginationWrapper}>
        {
          showPrev &&
          <div className={styles.paginationBtn}
          onClick={(e) => { onSetPage(1) }} >
            First
          </div>
        }
        {
          showPrev &&
          <div className={styles.paginationBtn}
          onClick={(e) => { onSetPage(Math.max(currentPageNumber - 1, 1)) }} >
            <FontAwesomeIcon icon={arrowLeft} />
          </div>
        }
        {pagesButtons.slice(firstIdx, lastIdx)}
        {
          showNext &&
          <div className={styles.paginationBtn}
          onClick={(e) => { onSetPage(Math.min(currentPageNumber + 1, pagesLength)) }} >
            <FontAwesomeIcon icon={arrowRight} />
          </div>
        }
        {
          showNext &&
          <div className={styles.paginationBtn}
          onClick={(e) => { onSetPage(pagesLength) }} >
            Last
          </div>
        }
      </div>
    );
  }

  const renderItemsPerPage = () => {
    const options = itemsPerPageOptions;
    const firstElement = ((currentPageNumber - 1) * itemsPerPage) + 1;
    const lastElement = Math.min(currentPageNumber * itemsPerPage, totalItems);
    let selectedLabel = `${firstElement}-${lastElement} of ${totalItems}`;
    if(totalItems === 0){
      selectedLabel = '0 of 0';
    }

    return (
      <div className={styles.itemsPerPage}>
        <div className={styles.label}>Show</div>
        <div className={styles.itemsPerPageSelector}>
          <div className={styles.selectedLabel}>{selectedLabel}</div>
          <FontAwesomeIcon icon={arrowDown} />
          <select onChange={(e) => { onItemsPerPageChange(e.target.value) }} value={itemsPerPage}>
            { options.map((opt, idx) => <option key={idx} value={opt} >{opt}</option>) }
          </select>
        </div>
      </div>
    );
  }

  return (
    !loading &&
    <div className={styles.pagination}>
      { totalItems > itemsPerPage && renderPages() }
      { !hideItemsPerPage && totalItems > 0 && renderItemsPerPage() }
    </div>
  );
};

//#region props definitions
// default values and types
Pagination.defaultProps = {
  hideItemsPerPage: false,
  loading: false,
  itemsPerPageOptions: [10, 20, 30, 40, 50],
  totalPagesShown: 5
};

Pagination.propTypes = {
  currentPageNumber: PropTypes.number.isRequired,
  hideItemsPerPage: PropTypes.bool,
  loading: PropTypes.bool,
  itemsPerPage: PropTypes.number.isRequired,
  itemsPerPageOptions: PropTypes.arrayOf(number),
  onItemsPerPageChange: PropTypes.func,
  onSetPage: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPagesShown: PropTypes.number
};
//#endregion

export default memo(Pagination);
