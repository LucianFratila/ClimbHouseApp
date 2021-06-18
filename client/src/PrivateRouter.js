import React, { useContext,useState,useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const firestore = app.firestore( )
import app from './base';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  const {superUser} = useContext(AuthContext);
  // console.log(currentUser.email);
  // console.log(superUser);

  
  


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