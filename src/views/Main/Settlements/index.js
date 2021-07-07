import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import ButtonGroup from '../../../components/ButtonGroup';

//tabs
import Settlements from './Tabs/Settlements';

const settlementsTabs = {
  0: <Settlements />
};

export default memo(function Settlements() {
  //bind styles
  classnames.bind(styles);

  //state
  const [currentTab, setCurrentTab] = useState(0);

  const handleItemClick = e => {
    //console.log(e);
  };

  return (
    <div className={styles.settlementsContainer}>
      <ButtonGroup
        items={[
          'Settlement',
          'Past Settlement',
          'Blockchain Fees',
          'Wallet Balance'
        ]}
        stylingMode="contained"
        onItemClick={handleItemClick}
      />
      <div className={styles.settlementsContent}>
        {settlementsTabs[currentTab]}
      </div>
    </div>
  );
});
