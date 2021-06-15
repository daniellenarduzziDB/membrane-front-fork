import React from 'react';
import { Redirect, Route } from 'react-router';

export default PrivateRoute = ({ component: Component }) => {
  return (
    <Route
      render={props =>
        loggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};
