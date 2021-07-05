import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import FontAwesomeIcon, { faTimes } from '../../FontAwesomeIcon';

export default memo(function Sidebar({ open, handleNotification }) {
  //bind styles
  classnames.bind(styles);

  return (
    <div
      className={classnames(
        styles.sidebarContainer,
        open ? styles['sidebarContainer--displayed'] : ''
      )}>
      <div className={styles.overlay}></div>
      <div className={styles.sidebar}>
        <h2>
          Notifications
          <FontAwesomeIcon icon={faTimes} onClick={handleNotification} />
        </h2>
        <div className={styles.sidebarContent}>No new notifications</div>
      </div>
    </div>
  );
});
