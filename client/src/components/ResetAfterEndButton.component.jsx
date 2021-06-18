import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function ResetAfterEndButton(props){
  

  const action =async ()=>{

    // console.log(firebaseID);
    const url = `${SERVER_URL}/clients/dismiss/${props.ClientId}`;
    const res = await fetch(url,{
        method: 'POST',
    })  
}
    const [isLoading, setLoading] = useState(false);
      
    
      
    useEffect(() => {
      if (isLoading) {
        action().then(() => {
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
         
        : `Dismiss`}
        </Button>
    )
}





export default ResetAfterEndButton