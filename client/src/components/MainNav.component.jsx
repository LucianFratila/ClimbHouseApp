
import "bootstrap/dist/css/bootstrap.min.css";




import logo from "../Logo-Climb-House-scris-white.png";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, { useContext } from 'react';
import { AuthContext } from "../Auth"
import Button from "react-bootstrap/Button";
import app from "../base";


import { BiLogInCircle, BiUser,BiRocket } from "react-icons/bi"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function MainNav({ history }) {
  
  const {currentUser} = useContext(AuthContext)
  const {superUser} = useContext(AuthContext)
  // console.log(superUser.roles);
const logout = ()=>{
  app.auth().signOut()
  refreshLogout()
  
  
}

const refreshLogout=()=>{
  location.reload()
  
  
}
  
  return (

      
      
      <Navbar
       bg={superUser.roles!=='super'?"secondary":'dark'} 
       variant="dark" 
       expand="lg">
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
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link> */}
          
          {
            superUser.roles==='normal'
            ?
            <Nav.Item>
              <Nav.Link href="/">All Clients</Nav.Link>
            </Nav.Item>
            :
            null
          }
          {
            superUser.roles==='super'
            ?
            <Nav.Item>
              <Nav.Link href="/cs">All Clients</Nav.Link>
            </Nav.Item>
            :
            null
          }
          
          
          <Nav.Item>
            <Nav.Link href="/active">Active Clients</Nav.Link>
          </Nav.Item>
          {
            superUser.roles==='normal'
            ?
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/settings">Tarifs and Products</NavDropdown.Item>
              
            </NavDropdown>
            :
            null
          }
          {
            superUser.roles==='super'
            ?
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/settings">Tarifs and Products</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Register admin</NavDropdown.Item>
              <NavDropdown.Item href="/logs">Logs</NavDropdown.Item>
            </NavDropdown>
            :
            null
          }
          
          
          
          
          <Nav.Item>
            <Nav.Link href="/rules">Rules</Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Text >
          <div style={{ justifyContent:'space-between'}}>
          <span>{superUser.roles!=='super'?<BiUser/>:<BiRocket/>} <a href={`/admins/${currentUser.email}`}>{currentUser.email}</a> </span>
          <Button size="sm" variant="outline-info" onClick={logout}><BiLogInCircle/></Button>
          
          </div>
         
        </Navbar.Text>
        
        
      </Navbar.Collapse>
    </Navbar>


      
    
   
  );
}

export default MainNav;
