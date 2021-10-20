
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Logo-Climb-House-scris-white.png";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, { useContext } from 'react';
import IsOpenButton from "./isOpenGym.component";
import Button from "react-bootstrap/Button";
import app from "../base";
import { AuthContext } from "../Auth"


import { BiLogInCircle, BiRocket, BiUser } from "react-icons/bi"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function MainNavSuperAdmin({ history }) {
const {currentUser} = useContext(AuthContext)
const logout = ()=>{
  app.auth().signOut()
  history.push("/login");
  // location.reload();
  
}  
  
  return (

      
      
      <Navbar bg="warning"   expand="lg"  variant="light" sticky="top" >
      {/* <Navbar.Brand href="#home">ClimbHouse</Navbar.Brand> */}
      
      
      
       
      <Navbar.Brand>
      <a href="/active">
      <img
        src={logo}
        width="80"
        height="80"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        
      />
      </a>
      
    </Navbar.Brand>
      <Navbar.Toggle  aria-controls="basic-navbar-nav" />
      <Navbar.Collapse  id="basic-navbar-nav">
        <Nav style={{color:'red'}} className="mr-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link> */}
          <Nav.Item>
            <Nav.Link href="/cs"><b>All Clients</b></Nav.Link>
          </Nav.Item>
          
          <Nav.Item>
            <Nav.Link href="/active"><b>Active Clients</b></Nav.Link>
          </Nav.Item>
          
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item href="/settings">Tarifs and Products</NavDropdown.Item>
            <NavDropdown.Item href="/signup">Register admin</NavDropdown.Item>
              <NavDropdown.Item href="/logs">Logs</NavDropdown.Item>
            
          </NavDropdown>
          
          
          
          <Nav.Item>
            <Nav.Link href="/rules"><b>Rules</b></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <IsOpenButton/>
          </Nav.Item>
        </Nav>
        <Navbar.Text >
          <div style={{ justifyContent:'space-between'}}>
          { currentUser?<span><BiRocket/>Rocket:  <a href={`/admins/${currentUser.email}`}>{currentUser.email}</a> </span>:'...Loading' }
          
          <Button size="sm" variant="danger" onClick={logout}><BiLogInCircle/></Button>
          
          </div>
         
        </Navbar.Text>
        
        
      </Navbar.Collapse>
    </Navbar>


      
    
   
  );
}

export default MainNavSuperAdmin;
