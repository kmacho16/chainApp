import React from 'react';
import { Route, Redirect } from 'react-router';
import { Component } from 'react';

const GuardedRoute = (component: any, auth: any, ...rest: any) => (
  <Route
    {...rest}
    render={props =>
      auth === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default GuardedRoute;
