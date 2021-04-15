import React, { useCallback, useContext,useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base";
import { AuthContext } from "../Auth";
import Container from 'react-bootstrap/Container'
import ResetPass from './ResetPass.component'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import logo from "../Logo-Climb-House-scris-white.png";
import { BiLogInCircle } from "react-icons/bi"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const LoginAdmin = ({ history }) => {
  const [show,setShow]=useState(false)

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
        history.push("/");
      } catch (error) {

        confirmAlert({
          
          message: ` ${error}`,
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                
              }
            }
          ],
          overlayClassName: "../index.css"
        })
        // alert(error.code);
        
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

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