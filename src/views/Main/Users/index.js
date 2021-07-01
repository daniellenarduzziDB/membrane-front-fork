import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components

export default memo(function Users() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.usersContainer}>
      <h1 style={{ color: 'white' }}>User view</h1>
    </div>
  );
});
