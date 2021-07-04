import React, {useState,useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import {  FaStop } from 'react-icons/fa';
import axios from 'axios';


import { AuthContext } from "../Auth"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function StopAll(props){

  const {superUser} = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const [serverResponse,setServerResponse] = useState({show:false,data:''})
  
    
  const stopAll= async()=>{
    
        
    try {
      setLoading(true)
        await axios({
          method:'POST',
          url:`${SERVER_URL}/clients/endAll/${props.ClientId}/${superUser.uid}`,
        }).then(res=> {setServerResponse({show:true,data:res.data})}) 
      } catch (error) {
        
        
        alert(error.response.data.message)
      }
      
      setTimeout(()=>{setServerResponse({show:false,data:''})},5000) 
      props.refresh()
      
      setLoading(false)
      
  }
  



    return(
        
            <span>
            <Button size='lg' variant='danger' disabled={loading?true:false} onClick={stopAll}>{serverResponse.show?`Done in ${serverResponse.data.executionTime} sec`:loading?'Loading...':'Stop All'}</Button>
            
            
            </span>
            
            
        
        
        
    )
}





export default StopAll