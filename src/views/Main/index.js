import { memo } from 'react';
import classnames from 'classnames';
import { Switch, Route } from 'react-router-dom';

//styles
import * as styles from './styles.module.scss';

//components
import Frame from '../../components/Frame';
import Form from '../../components/Form';

//views
import BuySell from './BuySell';
import Users from './Users';
import Settlements from './Settlements';
import MyBalance from './MyBalance';
import NotFound from './NotFound';

export default memo(function Main(props) {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.mainContent}>
      <Frame>
        <Switch>
          <Route exact strict path="/buy-sell" component={BuySell} />
          <Route exact strict path="/users" component={Users} />
          <Route exact strict path="/settlements" component={Settlements} />
          <Route exact strict path="/my-balance" component={MyBalance} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Frame>
    </div>
  );
});
