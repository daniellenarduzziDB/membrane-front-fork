import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

function NoEntries({heading, message}) {
  //bind styles
  classnames.bind(styles);

  // states
  const [visible, setVisible] = useState(false);

  // effects
  useEffect(() => {
    /* delay to allow for fetching results */
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    visible &&
    <div className={styles.noEntries}>
      <img alt="no entries image" src="/static/no_entries.svg" />
      { heading && <h2>{heading}</h2> }
      { message && <p>{message}</p> }
    </div>
  );
};

//#region props definitions
NoEntries.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string
};
//#endregion

export default memo(NoEntries);