import React, { useCallback, useState } from "react";
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




function ResetAdmin () {
    const [email, setEmail]=useState('')
    

    const onChangeEmail = (e)=>{
        e.preventDefault()
        setEmail(e.target.value)
        
    }
    const onSubmitEmail =async (e)=>{
        e.preventDefault()
        try {
            await app.auth().sendPasswordResetEmail(email).
            then(()=>{

                confirmAlert({
          
                    message: `Reset password send to: ${email}`,
                    buttons: [
                        {
                        label: 'Ok',
                        onClick: () => {
                            
                        }
                        }
                    ],
                    overlayClassName: "../index.css"
                })

            })
        } catch (error) {
            // console.log(error.message);
            confirmAlert({
          
                message: ` ${error.message}`,
                buttons: [
                    {
                    label: 'Ok',
                    onClick: () => {
                        
                    }
                    }
                ],
                overlayClassName: "../index.css"
            })
            
        }
    }
  


  return (
    <Container style={{backgroundColor:'white',borderRadius:'8px',padding:'10px',marginTop:'5px',color:'black'}}>
    <Row>
        <Col>
        <h2>Reset password</h2>
        <Form onSubmit={onSubmitEmail}>
        <Form.Group >
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type='email' placeholder="Email" onChange={onChangeEmail} />
            <Form.Text className="text-muted">
            {/* We'll never share your email with anyone else. */}
            </Form.Text>
        </Form.Group>
        <Button variant="success" type="submit">
            Reset
        </Button>
        </Form>
        
        </Col>
    </Row>
    </Container>
  );
};

export default withRouter(ResetAdmin);