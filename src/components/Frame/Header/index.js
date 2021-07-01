import { memo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//contants
import { APP_NAME } from '../../../contants/app';

//components
import NavBar from '../../NavBar';
import FontAwesomeIcon, { faBell, faCog } from '../../FontAwesomeIcon';

import membraneLogo from '../../../assets/logo_membrane.svg';

function Header() {
  //bind styles
  classnames.bind(styles);

  const handleItemClick = e => {
    alert(e);
  };

  return (
    <header>
      <div className={styles.appTitle}>
        <Link to="/">
          <img alt="membrane logo" src={membraneLogo} />
          {APP_NAME}
        </Link>
      </div>
      <div className={styles.navbar}>
        <NavBar
          items={[
            'Buy/Sell',
            'Loan/Borrow',
            'Users',
            'Settlements',
            'My Balance'
          ]}
          stylingMode="outlined"
          onItemClick={handleItemClick}
        />
      </div>
      <div className={styles.profile}>
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faCog} />
      </div>
    </header>
  );
}

export default withRouter(memo(Header));
