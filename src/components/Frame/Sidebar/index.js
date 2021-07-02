import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import FontAwesomeIcon, { faTimes } from '../../FontAwesomeIcon';

export default memo(function Sidebar() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.overlay}></div>
      <div className={styles.sidebar}>
        <h2>
          Notifications <FontAwesomeIcon icon={faTimes} />
        </h2>
      </div>
    </div>
  );
});
