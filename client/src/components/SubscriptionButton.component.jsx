import React from 'react';

import Button from 'react-bootstrap/Button'

const ButtonSub = (props)=>{
    return(
     
        

        <Button
        variant="warning"
        size='1.2em'
        onClick={props.toggleFunction}
        
        
          
        
        >
          {
              props.subscription===true
              ?
              <span>Unsubscribe</span>
              :
              <span>Subscribe</span>
          }
        </Button>



      
    )
  }

export default ButtonSub