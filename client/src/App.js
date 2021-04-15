
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import './index.css'
import ClientList from "./components/ClientList.component";
import ActiveClientList from "./components/ActiveClientList.component";
import GymPriceDisplay from "./components/GymPriceDisplay.component";
import EditClient from "./components/EditClient.component";
import Settings from "./components/Settings.component";
import MainNav from "./components/MainNav.component"


import logo from "./Logo-Climb-House-scris-white.png";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import React, { useEffect, useState, useContext } from 'react';
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import axios from 'axios';

// import { PublicRoute, PrivateRoute } from "react-private-public-route";

import LoginAdmin from "./components/LoginAdmin.component";
import SignupAdmin from "./components/SignupAdmin.compnent";
import ResetPass from "./components/ResetPass.component";
import ClientSideRules from './components/ClientSideRules.component'
import EditAdmin from "./components/EditAdmin.component";
import AdminLogs from "./components/AdminLogs.component";
import app from "./base";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
// import PublicRoute from "./PublicRoute";
import { BiLogInCircle } from "react-icons/bi"
import { AuthContext } from "./Auth";
import PublicRoute from "./PublicRoute";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App(props) {

  return (
  <Router>

    <AuthProvider>
    
    <PrivateRoute component={MainNav}/>
    <PublicRoute path='/rules' component={ClientSideRules}/> 
    <Container fluid className="color_theme">
      <Switch>
      <PrivateRoute path = '/' exact component={ClientList}/>
      <PrivateRoute path = '/active' exact component={ActiveClientList}/>
      <PrivateRoute path = '/edit/:id' component={EditClient}/>
      <PrivateRoute path = '/settings' component={Settings} />
      <PrivateRoute path = '/admins/:firebaseID' component={EditAdmin} />
      <PrivateRoute path = '/logs' component={AdminLogs} />
      <Route path = '/login' component={LoginAdmin} />
      
      <PrivateRoute path = '/signup' component={SignupAdmin} />
      </Switch>
    </Container> 

    </AuthProvider>
    
  </Router>
    
  );
}

export default App;










    // <AuthProvider>
    // <Router>
    //         <Switch>
    //           <PublicRoute exact path="/login" component={LoginAdmin} />
    //             {/* <PublicRoute
    //             exact
    //             restricted
    //             redirect="/homepage"
    //             path="/restricted"
    //             component={Restricted}
    //             /> */}
    //             {/* <PrivateRoute
    //             isAuthenticated={false}
    //             restricted
    //             redirect="/login"
    //             path="/homepage"
    //             component={Homepage}
    //             /> */}
    //         </Switch>
    //     </Router>
    //     </AuthProvider>