import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//import views
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import TwoFactor from './views/TwoFactor';

import Main from './views/Main';

//context
import { UserContextProvider } from './context/UserContext';
import { NotificationContextProvider } from './context/NotificationContext';

//private route
import PrivateRoute from './components/PrivateRoute';

//libs
import './lib/event';

export default function App() {
  return (
    <React.Fragment>
      <UserContextProvider>
        <NotificationContextProvider>
          <Router>
            <Switch>
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <PrivateRoute exact path="/two-factor" component={TwoFactor} />

              <Route exact path="/">
                <Redirect to="/buy-sell" />
              </Route>
              <PrivateRoute exact path="/:view" component={Main} />
            </Switch>
          </Router>
        </NotificationContextProvider>
      </UserContextProvider>
    </React.Fragment>
  );
}
