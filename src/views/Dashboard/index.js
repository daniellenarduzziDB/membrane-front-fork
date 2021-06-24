import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import Frame from '../../components/Frame';

export default memo(function Dashboard() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.dashboard}>
      <Frame />
    </div>
  );
});
