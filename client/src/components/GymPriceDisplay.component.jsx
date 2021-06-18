import React, {useEffect,useState} from 'react';
import axios from 'axios';



const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function GymPriceDisplay(props){

    const [gymPrice,setGymPrice]=useState([{}])
    function getFetchUrl() {
      return `${SERVER_URL}/settings`;
    }
  
    useEffect(()=>{
      let mounted = true;
      
      if(mounted){
          async function fetchData() {
              const result = await axios.get(getFetchUrl())
            //   console.log(result.data.settings);
              setGymPrice(result.data.settings);
              
            }
            fetchData()
      }
      
      return ()=>{
          mounted = false
          
          
      } 
  
  
      
  },[])

    return(
        <span style={{color:'white'}}>
            Adults: {gymPrice[0].adultPrice}lei / Kids: {gymPrice[0].kidPrice} 
        </span>
    )

}
export default GymPriceDisplay