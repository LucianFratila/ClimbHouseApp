// import { Button } from "bootstrap";
import React, { useContext } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import Button from 'react-bootstrap/Button'
const PublicRoute = ({ component: Component,restricted, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);
  return (
    <Route
      {...rest}
      render={routeProps =>
        currentUser && restricted ? (
          <Component {...routeProps} />
          
        ) : (
            
            <span>
              {/* <Button href='/login' variant="link" >
            Login 
            </Button> */}
              <Component {...routeProps} />
            </span>
        )
      }
    ></Route>
  );
};


export default PublicRoute