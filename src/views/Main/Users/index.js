import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import ButtonGroup from '../../../components/ButtonGroup';

//tabs
import Whitelist from './Tabs/Whitelist';

const usersTabs = {
  0: <Whitelist />
};

export default memo(function Users() {
  //bind styles
  classnames.bind(styles);

  //state
  const [currentTab, setCurrentTab] = useState(0);

  const handleItemClick = e => {
    //console.log(e);
  };

  return (
    <div className={styles.usersContainer}>
      <ButtonGroup
        items={[
          'Whitelist',
          'Pending Invites'
        ]}
        stylingMode="contained"
        onItemClick={handleItemClick}
      />
      <div className={styles.usersContent}>
        {usersTabs[currentTab]}
      </div>
    </div>
  );
});
