import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { RiChatDeleteLine } from "react-icons/ri";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function DeleteProdsHistory(props){


  const deleteClient =async (id)=>{

    
    const url = `${SERVER_URL}/clients/${props.clientId}/delete-history/${props.prodId}` ;
    const res = await fetch(url,{
        method: 'DELETE',
    })

    
  }
      const [isLoading, setLoading] = useState(false);
      
        
      
    useEffect(() => {
      if (isLoading) {
        deleteClient().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);
   
    const handleClick = () => {
      if (confirm(`Delete products: ${props.prodQty} x ${props.prodName} = ${props.prodTotal}/lei ?`)) {
        props.refresh()
        setLoading(true)
        
      } else {
        props.refresh()
        
      }
      
        
        
    };



    return(
        <Button
        variant="danger"
        size="sm"
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
          size="sm"
          role="status"
          aria-hidden="true"
          />
          
          </span>
         
        : <RiChatDeleteLine size='1.4em' />}
        </Button>
    )
}





export default DeleteProdsHistory