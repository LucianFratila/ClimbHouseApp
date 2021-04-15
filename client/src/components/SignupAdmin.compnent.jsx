import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SignupAdmin = ({ history }) => {
  
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).
          then(
            function success(userData){
              let fireBaseId = userData.user.uid; // The UID of recently created user on firebase
              let email = userData.user.email;


              const create =async ()=>{


                try {
                const url = `${SERVER_URL}/admins/add`;
        
                const response = await axios({
                    method: 'POST',
                    url: url,
                    data:{
                        
                        email,
                        fireBaseId
                    },
                    
                  })
                  } catch (err) {
                    console.log('Some error, please stop that!!!');
                    console.log('--------------------------------');
                    console.log(err);
                    
                  } 
            }
            create()
              
    
          }
          )

          var user = app.auth().currentUser;

          user.sendEmailVerification().then(function() {
            // console.log(user);
            confirmAlert({
          
              message: `Confirmation email send to ${user.email}`,
              buttons: [
                {
                  label: 'Ok',
                  onClick: () => {
                    
                  }
                }
              ],
              overlayClassName: "../index.css"
            })
            // alert(`Confirmation email send to ${user.email}`)
            


            


          }).catch(function(error) {
            // An error happened.
          });
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <Container>
    <Row>
        <Col>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSignUp}>
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
        <Button variant="primary" type="submit">
            Signup
        </Button>
        </Form>
        
        </Col>
    </Row>
    </Container>
  );
};

export default withRouter(SignupAdmin);