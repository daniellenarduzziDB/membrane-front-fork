import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import Header from './Header';

export default memo(function Frame({ children }) {
  classnames.bind(styles);

  return (
    <div>
      <Header />
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
});
