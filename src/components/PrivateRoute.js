import React from 'react';
import { Redirect, Route } from 'react-router';

import { isLoggedIn } from '../services/signin';

//hooks
import useUser from '../hooks/useUser';

const PrivateRoute = props => {
  const { twoFactorAuth } = useUser();
  const { path, component: Component } = props;

  if (path === '/two-factor' && twoFactorAuth) {
    return <Route render={props => <Component {...props} />} />;
  }

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
};

export default PrivateRoute;
