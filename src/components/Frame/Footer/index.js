import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components

export default memo(function Footer() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.footer}>
      <h5>Have doubts about trading?</h5>
      <label>Contact Membrane support</label>
      <a href="mailto:support@membrane.com">support@membrane.com</a>
    </div>
  );
});
