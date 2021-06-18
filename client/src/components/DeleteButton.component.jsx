import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function DeleteButton(props){

  const [isLoading, setLoading] = useState(false);
  const deleteClient =async (id)=>{
    
    if (confirm(`Delete ${props.name}?`)) {
      try {
      
        setLoading(true)
        const url = `${SERVER_URL}/clients/delete/`+ props.ClientId;
        const res = await fetch(url,{
            method: 'DELETE',
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
        <Button
        variant="warning"
        size="sm"
        disabled={isLoading}
        onClick={
          !isLoading ? deleteClient : null
          
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
          <span style={{marginLeft:'5px'}}>Deleting...</span>
          </span>
         
        : 'Delete'}
        </Button>
    )
}





export default DeleteButton