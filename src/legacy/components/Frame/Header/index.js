import { memo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';

//styles
import * as styles from './styles.module.scss';

//contants
import { APP_NAME } from '../../../contants/app';

//components
import ButtonGroup from '../../ButtonGroup';
import FontAwesomeIcon, { faBell, faCog } from '../../FontAwesomeIcon';
import { useHistory } from 'react-router-dom';

const headerRoutes = {
  0: '/buy-sell',
  1: '/loan-borrow',
  2: '/users',
  3: '/settlements',
  4: '/my-balance'
};

function Header({ handleNotification }) {
  //bind styles
  classnames.bind(styles);

  //history hook
  const history = useHistory();

  const handleItemClick = index => {
    history.push(headerRoutes[index]);
  };

  return (
    <header>
      <div className={styles.appTitle}>
        <Link to="/">
          <img alt="membrane logo" src="/static/logo_membrane.svg" />
          {APP_NAME}
        </Link>
      </div>
      <div className={styles.navbar}>
        <ButtonGroup
          items={[
            'Buy/Sell',
            'Loan/Borrow',
            'Users',
            'Settlements',
            'My Balance'
          ]}
          stylingMode="outlined"
          onItemClick={handleItemClick}
          defaultSelected={_.findKey(headerRoutes, o => {
            return o === history.location.pathname;
          })}
        />
      </div>
      <div className={styles.profile}>
        <FontAwesomeIcon icon={faBell} onClick={handleNotification} />
        <FontAwesomeIcon icon={faCog} />
      </div>
    </header>
  );
}

export default withRouter(memo(Header));
