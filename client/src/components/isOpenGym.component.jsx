import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function IsOpenButton(props){

  const [isLoading, setLoading] = useState(false);
  const [isOpenState, setIsOpenState] = useState(false)
    
    useEffect(()=>{
        axios.get(`${SERVER_URL}/settings/`).
            then((res)=>{
                // console.log(res.data.settings[0].isOpen);
                setIsOpenState(res.data.settings[0].isOpen)
            })
            setLoading(false)
    },[isLoading])

    const switchIsOpen = () => {

        const newOrder= {
            isOpen: !isOpenState,
            
        }
        
        try {
          setLoading(true)
          axios.post(`${SERVER_URL}/settings/edit/5fca11b76d4bcc2cc0d6b9ab`,newOrder)
          
        } catch (error) {
            console.log(error);
        }
        

    }
      
  



    return(
        <Button
        variant={isOpenState===true?"success":"danger"}
        size="Lg"
        disabled={isLoading}
        onClick={
          !isLoading ? switchIsOpen : null
          
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
          <span style={{marginLeft:'5px'}}>Loading...</span>
          </span>
         
        : isOpenState===true?"The Gym is open: Close it":"The Gym is closed: Open it"}
        </Button>
    )
}





export default IsOpenButton