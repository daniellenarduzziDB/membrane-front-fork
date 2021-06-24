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

function Header() {
  //bind styles
  classnames.bind(styles);

  const handleItemClick = e => {};

  return (
    <header>
      <div className={styles.logotype}>
        <Link to="/">{APP_NAME}</Link>
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
