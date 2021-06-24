import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//import views
import SignIn from './views/SignIn';
import TwoFactor from './views/TwoFactor';
import Dashboard from './views/Dashboard';

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
              <PrivateRoute exact path="/" />
              <PrivateRoute exact path="/two-factor" component={TwoFactor} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
        </NotificationContextProvider>
      </UserContextProvider>
    </React.Fragment>
  );
}
