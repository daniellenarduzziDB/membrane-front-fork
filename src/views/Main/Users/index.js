import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import ButtonGroup from '../../../components/ButtonGroup';

//tabs
import Whitelist from './Tabs/Whitelist';

const usersTabs = {
  0: <Whitelist />,
  1: <div/>
};

export default memo(function Users() {
  //bind styles
  classnames.bind(styles);

  //state
  const [currentTab, setCurrentTab] = useState(0);

  const handleItemClick = index => {
    setCurrentTab(index);
  };

  return (
    <div className={styles.usersContainer}>
      <ButtonGroup
        items={[
          'Whitelist',
          'Pending Invites'
        ]}
        stylingMode="contained"
        classes={styles.tabs}
        onItemClick={handleItemClick}
      />
      <div className={styles.usersContent}>
        {usersTabs[currentTab]}
      </div>
    </div>
  );
});
