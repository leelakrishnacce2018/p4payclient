import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom"; 
   
  
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...rest} {...props} replace />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }} replace 
          />
        )
      }
    />
);
  
export default PrivateRoute