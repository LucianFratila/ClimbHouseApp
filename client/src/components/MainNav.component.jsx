
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import '../index.css'
import ClientList from "../components/ClientList.component";
import ActiveClientList from "../components/ActiveClientList.component";
import GymPriceDisplay from "../components/GymPriceDisplay.component";
import EditClient from "../components/EditClient.component";
import Settings from "../components/Settings.component";


import logo from "../Logo-Climb-House-scris-white.png";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import React, { useEffect, useState } from 'react';
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import axios from 'axios';

import LoginAdmin from "../components/LoginAdmin.component";
import SignupAdmin from "../components/SignupAdmin.compnent";
import app from "../base";
import { AuthProvider } from "../Auth";
import PrivateRoute from "../PrivateRoute";
import { AuthContext } from "../Auth";
import { BiLogInCircle, BiUser } from "react-icons/bi"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function MainNav(props) {

  const [firebaseID,setFirebaseID] = useState()
  app.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // console.log(uid);
      setFirebaseID(uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  
  
  return (
    
    <AuthContext.Consumer>
      {(context) =>
      
      <Navbar bg="dark" variant="dark" expand="lg">
      {/* <Navbar.Brand href="#home">ClimbHouse</Navbar.Brand> */}
      
      
      
       
      <Navbar.Brand>
      <img
        src={logo}
        width="60"
        height="60"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
      <Navbar.Toggle  aria-controls="basic-navbar-nav" />
      <Navbar.Collapse  id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link> */}
          <NavDropdown title="Clients" id="basic-nav-dropdown">
            <NavDropdown.Item href="/">All Clients</NavDropdown.Item>
            <NavDropdown.Item href="/active">Active Clients</NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/signup">Register admin</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/logs">Logs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/rules">Rules</Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Text >
          <div style={{ justifyContent:'space-between'}}>
          <span><BiUser/> <a href={`/admins/${firebaseID}`}>{context.currentUser.email}</a> </span>
          <Button size="sm" variant="outline-info" onClick={()=>app.auth().signOut()}><BiLogInCircle/></Button>
          
          </div>
         
        </Navbar.Text>
        
        
      </Navbar.Collapse>
    </Navbar>



      
      }
    </AuthContext.Consumer>
      
      
    
   
  );
}

export default MainNav;
