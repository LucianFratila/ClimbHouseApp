import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import app from "../base";
import { AuthProvider } from "../Auth";
import PrivateRoute from "../PrivateRoute";
import { AuthContext } from "../Auth";
import { FaPlay } from 'react-icons/fa';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function StartButton(props){
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

  const startTime =async ()=>{

    // console.log(firebaseID);
    const url = `${SERVER_URL}/clients/start/`+ props.ClientId;
    const res = await fetch(url,{
        method: 'POST',
    })  
}
    const [isLoading, setLoading] = useState(false);
      
    
      
    useEffect(() => {
      if (isLoading) {
        startTime().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);
   
    const handleClick = () => {
        props.refresh()
        setLoading(true)
        
    };




    return(
        <Button 
        variant="success"
        size='1.4em'
        disabled={isLoading,props.status}
        onClick={
          !isLoading ? handleClick : null
          
        }
        >
        
        {isLoading ?
          <span>
          <Spinner
          as="span"
          animation="grow"
          size='1.2em'
          role="status"
          aria-hidden="true"
          />
          
          </span>
         
        : <FaPlay size='1.4em' />}
        </Button>
    )
}





export default StartButton