import React from 'react';
import { Redirect, Route } from 'react-router';

//services
import { isLoggedIn } from '../services/auth';

//hooks
import useUser from '../hooks/useUser';

const PrivateRoute = props => {
  const { twoFactorAuth } = useUser();
  const { path, component: Component } = props;

  if (path === '/two-factor') {
    if (twoFactorAuth && !isLoggedIn()) {
      return <Route render={props => <Component {...props} />} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  } else {
    return (
      <Route
        render={props =>
          isLoggedIn() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/sign-in' }} />
          )
        }
      />
    );
  }
};

export default PrivateRoute;
