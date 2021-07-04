import React, {useState,useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import {  FaStop } from 'react-icons/fa';
import axios from 'axios';


import { AuthContext } from "../Auth"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function StopIndividual(props){

  const {superUser} = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const [customAlert,setCustomAlert]=useState({show:false,message:''})
    
 
  const stopClimbersIndividual= async(id)=>{
    
      
    try {
        setLoading(true)
        await axios({
          method:'POST',
          url:`${SERVER_URL}/clients/endIndividual/${id}/${props.clientId}`,
        }) 
      } catch (error) {
        
        setCustomAlert({show:true,message:error.response.data.message})
        setTimeout(()=>{setCustomAlert({show:false,message:''})},5000)

        
        
      }
      setLoading(false)
      props.refresh()
      
  }
  



    return(
        <span>
            {customAlert.show?
            <Alert variant="danger" onClose={() => setCustomAlert({show:false,message:''})} dismissible>
            
           
              {customAlert.message}
            
            </Alert>
            :null
            }
            <Button variant='warning' size='md' disabled={loading?true:false}  onClick={()=>{stopClimbersIndividual(props.climberId)}}>{loading?<Spinner animation="border" size="sm" />:<FaStop/>}</Button>
            
        </span>
        
    )
}





export default StopIndividual