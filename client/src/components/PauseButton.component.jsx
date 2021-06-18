import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { FaPause, FaPlay } from 'react-icons/fa';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function PauseButton(props){

    let disabledButton
    if (props.timeOut > 0) {
        disabledButton=true
    } else {
        disabledButton=false
    }




const pauseTime =async ()=>{


const url = `${SERVER_URL}/clients/paused/`+ props.ClientId;
const res = await fetch(url,{
    method: 'POST',
})

}

const resumeTime =async ()=>{


const url = `${SERVER_URL}/clients/resume/`+ props.ClientId;
const res = await fetch(url,{
    method: 'POST',
})

}
  const [isLoading, setLoading] = useState(false);
  const [isLoadingResume, setLoadingResume] = useState(false)
  
    
  
useEffect(() => {
  if (isLoading) {
    pauseTime().then(() => {
      setLoading(false);
    });
    
  }
  if (isLoadingResume) {
    resumeTime().then(() => {
        setLoadingResume(false);
    });
    
  }
}, [isLoading,isLoadingResume]);




const handleClick = () => {

    props.refresh()
    setLoading(true)
 
    
};
const handleClickResume = () => {

    props.refresh()
    setLoadingResume(true)
 
    
};


// console.log('Din pauza: ',props.timeOut, props.name, disabledButton);



return(
    <>
    {
    props.paused === false
    ?
    <Button
    variant="info"
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
      
    : <FaPause size='1.4em' />}
    </Button>
    :
    <Button
    variant="info"
    size='1.2em'
    disabled={isLoadingResume,disabledButton}
    onClick={
      !isLoadingResume ? handleClickResume : null
      
    }
    >
    
    {isLoadingResume ?
      <span>
      <Spinner
      as="span"
      animation="grow"
      size='1.4em'
      role="status"
      aria-hidden="true"
      />
      
      </span>
      
    : <FaPlay  size='1.4em' />}
    </Button>
    }
     
    </>
   
)
}





export default PauseButton