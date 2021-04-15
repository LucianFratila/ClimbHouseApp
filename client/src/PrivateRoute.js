import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Button from 'react-bootstrap/Button'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser.email);
  // console.log(currentUser);
  let loged
  if (currentUser==null) {
    loged=false
  } else {
    loged=true
  }
  // console.log(loged);
  return (
    <Route
      {...rest}
      render={routeProps =>
        currentUser ? 
          <Component {...routeProps} />
         : 
         null
        
      }
    ></Route>
  );
};


export default PrivateRoute