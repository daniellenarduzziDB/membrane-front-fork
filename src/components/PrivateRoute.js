import React from 'react';
import { Redirect, Route } from 'react-router';

import { isLoggedIn } from '../services/signin';

const PrivateRoute = props => {
  const { path, component: Component } = props;
  console.log(path, props);
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
