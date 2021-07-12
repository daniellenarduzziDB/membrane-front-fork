import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import Button from '../../../../../components/Button';
import FontAwesomeIcon, {
  faInfoCircle
} from '../../../../../components/FontAwesomeIcon';

export default memo(function Settlements() {
  //bind styles
  classnames.bind(styles);

  return (
    <div>
      <div className={styles.settlementHeader}>
        <div className={styles.settlementAlert}>
          <FontAwesomeIcon icon={faInfoCircle} />
          <label>
            &nbsp;If you have your nano Ledger Live app open on your computer,
            please close it, otherwise, we could not read your address
          </label>
        </div>
        <Button text="Generate New Settlement" />
      </div>
    </div>
  );
});
