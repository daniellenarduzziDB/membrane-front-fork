import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components

export default memo(function Settlements() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.settlementsContainer}>
      <h1 style={{ color: 'white' }}>Settlements view</h1>
    </div>
  );
});
