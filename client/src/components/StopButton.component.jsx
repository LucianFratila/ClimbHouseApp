import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import { FaPlay, FaStop } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import app from "../base";
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



  let disabledButton
    if (props.paused === true) {
        disabledButton=true
    } else {
        disabledButton=false
    }

  const stopTime =async ()=>{


    const url = `${SERVER_URL}/clients/end/${props.ClientId}/${firebaseID}` ;
    const res = await fetch(url,{
        method: 'POST',
        
    })

}
      const [isLoading, setLoading] = useState(false);
      
        
      
    useEffect(() => {
      if (isLoading) {
        stopTime().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);
   
    const handleClick = () => {
      confirmAlert({
        title: 'Confirm action !',
        message: `Stop time for:  ${props.name} ?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              props.refresh()
              setLoading(true)
            }
          },
          {
            label: 'No',
            onClick: () => props.refresh()
          }
        ]
      })
        
    };

;

    return(
        <>
            {
                props.timeOut > 0 || props.status==false
                    ?
                    <Button
                    
                    variant="danger"
                    size='1.2em'
                    disabled={true}
                    >
                        <FaStop size='1.4em' />
                    </Button>
                    :
                    <Button
                    variant="danger"
                    size='1.2em'
                    disabled={isLoading,disabledButton}
                    onClick={
                    !isLoading ? handleClick : null
                    
                    }
                    >
                    
                    {isLoading ?
                    <span>
                    <Spinner
                    as="span"
                    animation="grow"
                    size='1.4em'
                    role="status"
                    aria-hidden="true"
                    />
                    
                    </span>
                    
                    : <FaStop size='1.4em' />}
                    </Button>
            }
            
        </>
        
    )
}





export default StartButton