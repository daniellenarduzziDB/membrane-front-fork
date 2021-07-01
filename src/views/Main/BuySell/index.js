import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import ButtonGroup from '../../../components/ButtonGroup';

export default memo(function BuySell() {
  //bind styles
  classnames.bind(styles);

  const handleItemClick = e => {
    //console.log(e);
  };

  return (
    <div className={styles.buySellContainer}>
      <ButtonGroup
        items={['Inbox', 'Outbox', 'Completed']}
        stylingMode="contained"
        onItemClick={handleItemClick}
      />
    </div>
  );
});
