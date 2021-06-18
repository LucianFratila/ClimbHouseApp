// import { Button } from "bootstrap";
import React, { useContext } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { AuthContext } from "./Auth";

const PublicRoute = ({ component: Component, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);
  return (
    <Route
      {...rest}
      render={routeProps =>
        currentUser ? 
        (
          
          // <Component {...routeProps} />
          <Redirect to='/login'/>
          
        ) 
        : 
        (
            
            <span>
             
              <Component {...routeProps} />
            </span>
        )
      }
    ></Route>
  );
};


export default PublicRoute