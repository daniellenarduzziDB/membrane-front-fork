import { memo } from 'react';
import classnames from 'classnames';

//components
import FontAwesomeIcon, {
  faChevronDown as arrowDown,
  faChevronLeft as arrowLeft,
  faChevronRight as arrowRight,
} from '../FontAwesomeIcon';

//styles
import * as styles from './styles.module.scss';

const ITEMS_PER_PAGE_OPTIONS = [10,20,30,40,50];
const TOTAL_PAGES_SHOWN = 5;

export default memo(function Pagination({
  itemsPerPage,
  itemsPerPageOptions,
  currentPageNumber,
  hideItemsPerPage,
  onItemsPerPageChange,
  onSetPage,
  total,
  totalPagesShown,
}) {
  //bind styles
  classnames.bind(styles);
  
  const renderPages = () => {
    const pagesLength = Math.ceil(total/itemsPerPage);
    let pagesButtons = [];

    for (let i = 1; i <= pagesLength; i++) {
      pagesButtons.push(
        <div
          key={i}
          className={`page-number ${currentPageNumber === i ? 'active': ''}`}
          onClick={(e) => { onSetPage(i) }} >
          {i}
        </div>
      );
    }

    const totalShown = totalPagesShown || TOTAL_PAGES_SHOWN;
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
      <div className="pagination-wrapper">
        {
          showPrev &&
          <div className="pagination-link"
          onClick={(e) => { onSetPage(1) }} >
            First
          </div>
        }
        {
          showPrev &&
          <div className="pagination-link"
          onClick={(e) => { onSetPage(Math.max(currentPageNumber - 1, 1)) }} >
            <FontAwesomeIcon icon={arrowLeft} />
          </div>
        }
        {pagesButtons.slice(firstIdx, lastIdx)}
        {
          showNext &&
          <div className="pagination-link"
          onClick={(e) => { onSetPage(Math.min(currentPageNumber + 1, pagesLength)) }} >
            <FontAwesomeIcon icon={arrowRight} />
          </div>
        }
        {
          showNext &&
          <div className="pagination-link"
          onClick={(e) => { onSetPage(pagesLength) }} >
            Last
          </div>
        }
      </div>
    );
  }

  const renderItemsPerPage = () => {
    const options = itemsPerPageOptions || ITEMS_PER_PAGE_OPTIONS;
    const firstElement = ((currentPageNumber - 1) * itemsPerPage) + 1;
    const lastElement = Math.min(currentPageNumber * itemsPerPage, total);
    let selectedLabel = `${firstElement}-${lastElement} of ${total}`;
    if(total === 0){
      selectedLabel = '0 of 0';
    }

    return (
      <div className="items-per-page">
        <div className="label">Show</div>
        <div className="items-per-page-selector">
          <div className="selected-label">{selectedLabel}</div>
          <FontAwesomeIcon icon={arrowDown} />
          <select onChange={(e) => { onItemsPerPageChange(e.target.value) }} value={itemsPerPage}>
            { options.map((opt, idx) => <option key={idx} value={opt} >{opt}</option>) }
          </select>
        </div>
      </div>
    );
  }

  return (
    !isFetching &&
    <div className='pagination'>
      { total > itemsPerPage && renderPages() }
      { !hideItemsPerPage && total > 0 && renderItemsPerPage() }
    </div>
  );
});