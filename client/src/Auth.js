import React, { useEffect, useState } from "react";
import app from './base';
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);
  
  if(pending){
    return <>
    <Spinner style={{display:'flex',alignItems:'center'}} size='100%' animation="grow" variant="light" />
    
    </>
  }

  return (
    <AuthContext.Provider value={{currentUser}}>
      {!pending&&children}
    </AuthContext.Provider>
  );
}