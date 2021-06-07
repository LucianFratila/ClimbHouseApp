import React, {useEffect,useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import StopButton from './StopButton.component'
import ResetButton from './ResetButton.component'
import InsertClimbers from './InsertClimbers.component'
import PauseButton from './PauseButton.component'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'







const SERVER_URL = process.env.REACT_APP_SERVER_URL;










function ClientList(){

    

    

    const[alert, setAlert] = useState(false);
    const[clients,setClients] = useState([]);
    
    let totalClimbers = clients.reduce((accumulator, current) => accumulator + current.noOfpeopleClimbing, 0);
    


    const [counter, setCounter] = useState(0);

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          let id = setInterval(() => {
            savedCallback.current();
          }, delay);
          return () => clearInterval(id);
        }, [delay]);
      }
    
    


    useInterval(() => {
        setCounter(counter + 1);
        
      }, 10000);


    let ctime = (a,b)=>{
        return b - a
    }

    function calculateSeconds(a,b){
        let total
         
            if (b===0) {
                return total = 0
            } else {
                return total = ((a-b)/1000).toFixed(0)
            }  
    }
    function calculateMins(a,b){
        var total
         
            if (b===0) {
                return total = 0
            } else {
                return total = (((a-b)/1000)/60).toFixed(0)
            }  
    }
    
    useEffect(() => {
        if(alert) {
          setTimeout(() => {
            setAlert(false);
          }, 1000)
        }
      }, [alert])




      function getFetchUrl() {
        return `${SERVER_URL}/clients/active`;
      }
      useEffect(()=>{
            
          
        let mounted = true;
        
        if(mounted){
            async function fetchData() {
                const result = await axios.get(getFetchUrl())
                setClients(result.data.clients);
                // setAll(result.data.results);
                // setActive(result.data.active);
                // setClimbers(result.data.clibersInGym)
                
                
                
              }
              fetchData()
        }
        
        return ()=>{
            mounted = false
            
            
        } 
    
    
        
    },[alert])

    const refresh = ()=>{
        setAlert(true)
        
    }
   
    return(
    <div>
        <Row > 
            <span style={{marginTop:'10px',marginLeft:'15px',marginRight:'15px'}}>
                <h4>Active Clients </h4>
                <h6>Number of users: {clients.length} / Total Climbers in Gym: {totalClimbers>20?<h5 style={{color:'red'}}>{totalClimbers}</h5>:<h5>{totalClimbers}</h5>}</h6>
            </span>
        </Row>
        <Row style={{marginTop:'10px'}} xl={3} lg={2} md={2} sm={1} xs={1}>
            
        {
            clients.map( client=>(
                <Col style={{padding:'5px'}} key={client._id} >
                    <CardGroup>
                        <Card
                        
                        border="dark"
                        bg='dark'
                        text='light'
                        style={{ width: 'auto',height:'auto' }}
                        className="mb-2"
                        >
                        <Card.Header 
                        style={{background:
                            client.timeOut > 0
                            ?
                                client.status===true
                                ?
                                'linear-gradient(180deg, rgba(130,0,0,1) 0%, rgba(171,8,8,1) 50%, rgba(255,0,0,1) 100%)'
                                :
                                'gray'
                            :
                                client.status===true
                                ?
                                'linear-gradient(180deg, rgba(71,120,1,1) 0%, rgba(104,150,8,1) 50%, rgba(107,186,1,1) 100%)'
                                :
                                'gray'
                        }} 
                        className="mb-2 "> 
                        {
                            client.pausedStatus===true
                            ?
                            <span style={{marginLeft:'3px', fontSize:'25px',}}>{client.name} ~ Paused</span>
                            :
                            <span style={{marginLeft:'3px', fontSize:'25px',}}>{client.name}</span>
                        }
                        
                        
                        <span style={{float:'right'}}>
                            <Link style={{marginRight: "5px"}}  className="btn btn-primary" to={"/edit/"+ client._id}>Details</Link>
                        </span>
                        
                        
                        </Card.Header>
                        <Card.Body>
                                <Card.Title  >
                                <span >
                                    
                                    <small style={{color:'white'}} >
                                    <cite title="Source Title">




                                        <span style={{fontSize:'15px',color:'white', marginRight:'10px'}} >
                                             {client.startTime} 
                                        </span>

                                        {
                                        client.timeOut
                                        ?
                                        <span style={{fontSize:'15px',color:'green', marginRight:'10', fontWeight:'bolder'}}>
                                            {client.finalTime}/min @ {client.due}/lei
                                        </span>
                                        :
                                            client.pausedStatus === false
                                            ?
                                            
                                            <span style={{fontSize:'15px',color:'white', marginRight:'10px'}}>
                                                { ctime(client.totalPaused,calculateMins(Date.now(),client.timeIn)) }/min
                                            </span>

                                            
                                            :
                                            <span style={{marginRight:'10px',fontSize:'15px', color:"red"}}>
                                                 {client.elapsedOnPaused}/min
                                            </span>
                                        }

                                        <span style={{fontSize:'15px',color:'white',marginLeft:'10px'}}>
                                                 {client.noOfpeopleClimbing}
                                                (Adults:{client.adults}・Kids:{client.kids})
                                        </span>



                                    </cite>
                                    </small>
                                </span>
                                </Card.Title>
                            
                            <span>
                            {
                                client.noOfpeopleClimbing === 0
                                ?
                                <InsertClimbers noAdult={client.adults} refresh={refresh} noKids={client.kids} ClientId={client._id}/>
                                
                                :
                                <ButtonGroup size="lg" className="mb-2">
                                    {/* <StartButton ClientId={client._id} refresh={refresh} status={client.status} /> */}
                                    <PauseButton ClientId={client._id} refresh={refresh} timeOut={client.timeOut} name={client.name} status={client.status} paused={client.pausedStatus}/>
                                    <StopButton ClientId={client._id} refresh={refresh} timeOut={client.timeOut} status={client.status} name={client.name} paused={client.pausedStatus}/> 
                                    <ResetButton ClientId={client._id} refresh={refresh} name={client.name} due={client.due} time={client.finalTime}/>
                                </ButtonGroup>

                            }
                            
                            {/* <InsertClimbers noAdult={client.adults} refresh={refresh} noKids={client.kids} ClientId={client._id}/> */}
                            </span>
                            
                            
                        </Card.Body>
                    </Card>
                    </CardGroup>
                </Col>
            ))
        }
       
            
            
        </Row>
        
        
        
        
                                            

    </div>
        
    )
    
}
export default ClientList





