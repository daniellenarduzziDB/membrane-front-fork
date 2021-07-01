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
import { AlertContextProvider } from './context/AlertContext';

//private route
import PrivateRoute from './components/PrivateRoute';

//libs
import './lib/event';

export default function App() {
  return (
    <React.Fragment>
      <UserContextProvider>
        <AlertContextProvider>
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
        </AlertContextProvider>
      </UserContextProvider>
    </React.Fragment>
  );
}
