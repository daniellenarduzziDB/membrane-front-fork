import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components

export default memo(function NotFound() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.notFoundContainer}>
      <h1 style={{ color: 'white' }}>Sorry, route not found</h1>
    </div>
  );
});
