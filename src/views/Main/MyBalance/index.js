import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components

export default memo(function MyBalance() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.myBalanceContainer}>
      <h1 style={{ color: 'white' }}>My Balance view</h1>
    </div>
  );
});
