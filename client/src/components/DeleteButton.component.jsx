import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function DeleteButton(props){


  const deleteClient =async (id)=>{

    
    const url = `${SERVER_URL}/clients/delete/`+ props.ClientId;
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
      confirmAlert({
        title: 'Confirm action!',
        message: `Delete:  ${props.name}?`,
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
        ],
        overlayClassName: "../index.css"
      })
        
        
    };



    return(
        <Button
        variant="warning"
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
          <span style={{marginLeft:'5px'}}>Deleting...</span>
          </span>
         
        : 'Delete'}
        </Button>
    )
}





export default DeleteButton