import React, { useCallback, useContext,useState } from "react";
import { withRouter } from "react-router";
import app from "../base";
import Container from 'react-bootstrap/Container'
import ResetPass from './ResetPass.component'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import logo from "../Logo-Climb-House-scris-white.png";
import { AuthContext } from "../Auth";


const LoginAdmin = ({ history }) => {
  const [show,setShow]=useState(false)
  const {superUser} = useContext(AuthContext)
  // console.log(superUser);
  const showReset = (e)=>{
    e.preventDefault()
    if (show==false) {
      setShow(true)

    } else {
      setShow(false)
    }
  }
  
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          // if (superUser.roles==='super') {
          //   history.push("/cs");
          // } 
          // if (superUser.roles==='normal') {
          //   history.push("/");
          // } 
          history.push("/active");
      } catch (error) {

       
        alert(error);
        
      }
    },
    [history]
  );

  // if (superUser!==null) {
  //   console.log(superUser.roles);
  //   if (superUser.roles==='super') {
  //   return <Redirect to="/cs" />;
  // }
  // }

  

  return (


    <Container>
    <Row>
    <Image style={{margin:'auto'}} src={logo} fluid /> 
    </Row>
    <Row>
        <Col>
        <h2>Admin Login</h2>
        <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Email" />
            <Form.Text className="text-muted">
            {/* We'll never share your email with anyone else. */}
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" />
        </Form.Group>
        <ButtonGroup>
        <Button variant="primary" type="submit">
            Login
        </Button>
        <Button variant="outline-primary" onClick={showReset}>
            Recover password
        </Button>
        </ButtonGroup>
        
        </Form>
        {
        show==false
        ?
        null
        :
        <ResetPass/>
        }
        </Col>
    </Row>
    
    </Container>
    
  );
};

export default withRouter(LoginAdmin);