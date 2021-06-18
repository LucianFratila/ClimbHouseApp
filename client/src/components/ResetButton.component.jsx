import axios from 'axios';
import React, {useState,useContext} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { FaExclamationTriangle} from 'react-icons/fa';

import { AuthContext } from "../Auth"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function ResetButton(props){

  const {currentUser} = useContext(AuthContext)
  const [isLoading, setLoading] = useState(false);
  
  // console.log(currentUser.uid);
const resetTime =async ()=>{




const url = `${SERVER_URL}/clients/reset/${props.ClientId}/${currentUser.uid}`;


if (confirm(`Kick Out ${props.name}?`)) {
  try {
  
    setLoading(true)
    await axios(url,{
      method: 'POST',
      data:{
        kickOutDueFromClientSide: props.dueFromClientSide
    }
  })
  } catch (error) {
    alert(error)
  }
  setLoading(false)
} else {
  // Do nothing!
  
}


props.refresh()


















}
  
  
    
  


return(

    <>
   


    {
      props.in===0 || props.paused===true || props.out>0
      ?
      <Button
      variant="warning"
      size='1.2em'
      disabled={true}
      
      >
        <span>
        <FaExclamationTriangle size='25px'/> <span>Kick Out: n/a</span>
      </span>
      </Button>
      :
      <Button
    variant="warning"
    size='1.2em'
    disabled={isLoading}
    onClick={!isLoading ? resetTime: null}
    >
    
    {
    isLoading ?
      <span>
      <Spinner
      as="span"
      animation="grow"
      size='1.4em'
      role="status"
      aria-hidden="true"
      />
      
      </span>
      
    : 
      <span>
        <FaExclamationTriangle size='25px'/> <span>Kick Out</span>
      </span>
    }
    </Button>
    }
    </>
)
}





export default ResetButton