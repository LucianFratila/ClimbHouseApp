import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FaExclamationTriangle, FaPlay, FaStop, FaUndo } from 'react-icons/fa';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function ResetButton(props){


const resetTime =async ()=>{


const url = `${SERVER_URL}/clients/reset/`+ props.ClientId;
const res = await fetch(url,{
    method: 'POST',
})





}
  const [isLoading, setLoading] = useState(false);
  
    
  
useEffect(() => {
  if (isLoading) {
    resetTime().then(() => {
      setLoading(false);
    });
  }
}, [isLoading]);




const handleClick = () => {
  confirmAlert({
    title: '!!! Kicking Out !!!',
    message:`${props.name} > ${props.due.toString()}/lei @ ${props.time.toString()}/min`,
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
    <Button
    variant="warning"
    size='1.2em'
    disabled={isLoading}
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
      
    : <span><FaExclamationTriangle size='25px'/> <span>Kick Out</span></span>}
    </Button>
)
}





export default ResetButton