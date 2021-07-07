import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components

export default memo(function Overlay() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
});
