import React, {useState,useContext} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {  FaStop } from 'react-icons/fa';


import { AuthContext } from "../Auth"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function StopButton(props){

  const {superUser} = useContext(AuthContext)
  const [isLoading, setLoading] = useState(false);
 

  let disabledButton
    if (props.paused === true) {
        disabledButton=true
    } else {
        disabledButton=false
    }

  const stopTime =async ()=>{


    const url = `${SERVER_URL}/clients/end/${props.ClientId}/`+superUser.uid ;
    if (confirm(`Stop Time for ${props.name}?`)) {
      try {
      
        setLoading(true)
        const res = await fetch(url,{
          method: 'POST',
          
      })
      } catch (error) {
        alert(error)
      }
      
    } else {
      setLoading(false)
      
    }

    
    props.refresh()

}


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
                    !isLoading ? stopTime : null
                    
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





export default StopButton