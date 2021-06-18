
import React, {useEffect,useState,useRef} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import ProductsSelectForm from './ProductsSelectForm.component'
import SubscriptionButton from './SubscriptionButton.component'
import DeleteProdsHistory from './DeleteProdsHistory.component'
import { FaEnvelope, FaUserCircle,FaUsers,FaCartPlus,FaCalendarCheck, FaPlay, FaTimes, FaClock, FaTools, FaPhone, FaDollarSign } from 'react-icons/fa';
import { IoMdWalk,IoMdTimer } from "react-icons/io";
import StopButton from './StopButton.component'
import ResetButton from './ResetButton.component'
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function MyVerticallyCenteredModal(props) {
  
  
  return (
    <Modal
      
      show={props.show}
      onHide={props.handleClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          <h6>Session History for {props.name} | Results: {props.data.length} | Created at: {props.date.toString().substr(0, 10)}</h6>
          <p style={{fontSize:'14px'}}><FaTimes color='red' size='12px'/> kicked of | <FaPlay color='green' size='12px'/> Session ok | k: kids / a: adults </p>  
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
      <Container>
      <Row>
          <Col sm={12}>
              <div className="scrollableContent">
              {
              props.data.length===0
              ?
              <span style={{color:'black'}}>No logs yet!</span>
              :
              props.data.sort((a,b)=>a.dateLog<b.dateLog? 1 : -1).map(item=>(
                      
                <ListGroup key={item._id} variant="flush">
                
                <ListGroup.Item variant='info'  >
                <span style={{verticalAlign:'middle',display:'inline-block'}}> 
                {item.kickedOF?<span><FaTimes color='red' size='14px'/></span>:<span><FaPlay color='green' size='14px'/></span>} <b>{item.timeIn}</b> | {item.admin} | <FaClock size='14px'/> {item.totalTime}/min | <FaDollarSign size='14px'/> {item.due}/lei @ k: {item.kids}/a: {item.adults}
                </span>
                </ListGroup.Item>
                
                </ListGroup> 
            ))
              }
              
              </div>
          </Col>
          
      </Row>
      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function EditClient(props) {
    const [loading,setLoading] = useState(true)
    const [prodHistory, setProdhistory] = useState([]);
    const [adults, setAdults] = useState(0);
    const [status, setStatus] = useState();
    const [kids, setKids] = useState(0);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [prods,setProds] = useState([]);
    const [alert, setAlert] = useState(false);
    const [due,setDue] = useState(0)
    const [finalTime,setFinalTime] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)
    const [qty,setQty] = useState(0)
    const [sub, setSub] = useState(0)
    const [remainigSub, setRemainigSub] = useState(0)
    const [startTime, setStartTime] = useState()
    const [pausedStatus, setPausedStatus] = useState(false)
    const [totalPaused,setTotalPaused] = useState(0)
    const [timeIn,setTimeIn] = useState(0)
    const [timeOut,setTimeOut] = useState(0)
    const [elapsedOnPaused,setElapsedOnPaused] = useState(0)
    const [initialSub,setInitialSub] = useState(0)
    const [history,setHistory]=useState([])
    const [showHistory,setShowHistory]=useState(false)
    const [dateCreated,setDateCreated]=useState('')
    // console.log(history);


    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if(alert) {
          setTimeout(() => {
            setAlert(false);
          }, 1000)
        }
      }, [alert])

      const refresh = ()=>{
        setAlert(true)
        
    }

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
        var total
         
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

    useEffect(()=>{
        let mounted = true;
        if(mounted){
            async function fetchData() {
                function getFetchUrl() {
                    return `${SERVER_URL}/clients/` + props.match.params.id;
                  }
                const result = await axios(getFetchUrl());
                // console.log(result.data.data.client.date);
                setDateCreated(result.data.data.client.date)
                setHistory(result.data.data.client.sessionHistory)
                setAdults(result.data.data.client.adults);
                setKids(result.data.data.client.kids);
                setName(result.data.data.client.name);
                setEmail(result.data.data.client.email);
                setStatus(result.data.data.client.status);
                setProds(result.data.data.products);
                setPhone(result.data.data.client.phone);
                setProdhistory(result.data.data.client.prodHistory);
                setDue(result.data.data.client.due);
                setFinalTime(result.data.data.client.finalTime)
                setSub(result.data.data.client.statusSub)
                setRemainigSub(result.data.data.client.remainigSub)
                setStartTime(result.data.data.client.startTime)
                setPausedStatus(result.data.data.client.pausedStatus)
                setTotalPaused(result.data.data.client.totalPaused)
                setTimeIn(result.data.data.client.timeIn)
                setTimeOut(result.data.data.client.timeOut)
                setElapsedOnPaused(result.data.data.client.elapsedOnPaused)
                setInitialSub(result.data.data.client.initialSub)

                
                
              }
              fetchData()
        }
        
        return ()=> mounted = false
           
        
         
        
    },[alert])
    
    let trasnfer = (a) => {
        // console.log(a);
        return a
    }

    const toggle = (e)=>{

        
        

      e.preventDefault()
      
      let statusValue
      if (sub===false) {
          statusValue=true
      } else {
          statusValue=false
      }
      
      const value = {
          status: statusValue,
          initial:16
      }
      

      axios.post(`${SERVER_URL}/clients/subscription/` + props.match.params.id ,value)
      refresh()
      // console.log(sub);
  }

  let totalHistory = prodHistory.reduce(function(prev, cur) {
    return prev + cur.total;
    }, 0);

    return(
        
            <div>
                  <MyVerticallyCenteredModal
                    name={name}
                    date={dateCreated}
                    data={history}
                    show={showHistory}
                    handleClose={() => setShowHistory(false)}
                    onHide={() => setShowHistory(false)}
                    
                    
                />
               
                <Container >
                    <Row >
                        <Col  style={{backgroundColor:'#2b2b2b',display: 'flex',alignItems:'center'}} sm={6}><FaUserCircle size='1.4em'/><span style={{marginLeft:'5px',fontSize:'30px'}}>{name}</span></Col>
                        <Col  style={{backgroundColor:'#2f2e2e',display: 'flex',alignItems:'center'}} sm={3}><FaEnvelope/> <span style={{marginLeft:'5px'}}>{email}</span></Col>
                        <Col  style={{backgroundColor:'#2f2e2e',display: 'flex',alignItems:'center'}} sm={3}><FaPhone/> <span style={{marginLeft:'5px'}}>{phone}</span></Col>
                    </Row>
                    <Row xl={4} lg={4} md={2} sm={1} xs={1} style={{backgroundColor:'#404040'}} >
                        <Col style={{display: 'flex',alignItems:'center'}}  sm><IoMdWalk size='1em'/><span style={{marginLeft:'5px'}}> User: {status === true ? 'Active' : 'Not Active'}</span></Col>
                        <Col style={{display: 'flex',alignItems:'center'}}  sm><IoMdTimer size='1em'/><span style={{marginLeft:'5px'}}> 
                        {startTime==='0'  ? <span>Time not started</span> : <span>{startTime}</span>}</span>
                        </Col>
                        <Col style={{display: 'flex',alignItems:'center'}}  sm><FaUsers size='1em'/><span style={{marginLeft:'5px'}}> 
                        {
                        kids === 0 && adults === 0 
                        ?
                        <span>0 clibers</span>
                        :
                        <span>{adults + kids}  @ {adults} adult(s) / {kids} kid(s)</span>
                        }
                        </span>
                        </Col>
                        <Col style={{display: 'flex',alignItems:'center'}}  sm><IoMdTimer size='1em'/>
                            <span style={{marginLeft:'5px'}}> 
                             {finalTime > 0 ? <span>Final: {finalTime} min @ {due}/lei</span> : pausedStatus === false ? <span>{ctime(totalPaused,calculateMins(Date.now(),timeIn))}/min</span> : <span>Paused: {elapsedOnPaused}/min</span> }
                            </span>
                        </Col>
                        
                    </Row>
                    <Row xl={4} lg={4} md={2} sm={1} xs={1} style={{backgroundColor:'#404040'}} >
                        <Col style={{display: 'flex',alignItems:'center'}}  sm>
                        <FaCalendarCheck size='1em'/>
                        <span style={{marginLeft:'5px'}}>
                          Subscribed: {
                          sub === true ? 'Yes' : 'No'
                          }
                        </span>
                        </Col>
                        <Col style={{display: 'flex',alignItems:'center'}}  sm>   
                        <FaCalendarCheck size='1em'/>
                        <span style={{marginLeft:'5px'}}>
                          {
                          sub === true ? <span>{initialSub}/{remainigSub} entries remaining</span> : 'n/a'
                          }
                        </span>
                        </Col>   
                    </Row>
                    <Row>
                    <Col  style={{backgroundColor:'#2f2e2e',display: 'flex',alignItems:'center'}}><FaTools size='1.4em'/> <span style={{marginLeft:'5px',fontSize:'20px',padding:'10px'}}>Time/Subscription Control</span><Button variant='info' onClick={()=>{setShowHistory(true)}}>History</Button></Col>
                    </Row>
                    <Row>
                    <Col  style={{backgroundColor:'#2f2e2e',alignItems:'center'}}>
                      <span>
                          <span>
                          <ButtonGroup size="lg" className="mb-2">
                          <SubscriptionButton toggleFunction={toggle} subscription={sub} refresh={refresh} />
                          <StopButton ClientId={props.match.params.id} refresh={refresh} timeOut={timeOut} status={status} name={name}/>
                          
                          </ButtonGroup>
                          </span>
                          
                          <span style={{float:'right'}}>
                          <ResetButton ClientId={props.match.params.id} in={timeIn} out={timeOut} paused={pausedStatus} refresh={refresh} name={name} due={due} time={finalTime}/> 
                          </span>
                      </span>
                      
                    
                    </Col>
                    </Row>
                    <Row>
                    <Col  style={{backgroundColor:'#2f2e2e',display: 'flex',alignItems:'center'}}><FaCartPlus size='1.4em'/> <span style={{marginLeft:'5px',fontSize:'20px',padding:'10px'}}>Add Products</span></Col>
                    </Row>
                    
                    <Row xl={2} lg={2} md={1} sm={1} xs={1} style={{height:'100px'}}>
                      <Col   style={{backgroundColor:'#2b2b2b',display: 'flex',alignItems:'center'}}>
                          <ProductsSelectForm clientId={props.match.params.id} products={prods} refresh={refresh} transfer={trasnfer}/>
                      </Col>
                      <Col   style={{backgroundColor:'#2b2b2b',display: 'flex',alignItems:'center'}}>
                          <span style={{fontSize:'20px'}}>
                            {sub===true
                            ?
                            `Total : ${totalHistory} lei + 0(Subscribed) lei  = ${totalHistory} lei`
                            :
                            `Total : ${totalHistory} lei + ${due} lei  = ${totalHistory+due} lei`
                            }
                            
                          </span>
                      </Col>
                    </Row>
                    <Row xl={4} lg={3} md={2} sm={2} xs={1} style={{backgroundColor:'#404040'}} >
                              {
                                prodHistory.map((item) => (
                                  <Col key={item._id}>
                                      <Card
                                      bg='secondary'
                                      style={{width:'auto',marginTop:'10px',marginBottom:'10px'}}
                                      text='light'
                                      
                                      
                                    >
                                    <Card.Header>{item.productName}<span style={{float:'right'}}><DeleteProdsHistory clientId={props.match.params.id} refresh={refresh} prodId={item._id} prodName={item.productName} prodQty={item.qty} prodTotal={item.total}/></span></Card.Header>
                                      <Card.Body>
                                        
                                        <Card.Text>
                                          <b>{item.qty}</b> x {item.price} lei/buc = <b>{item.total}</b> lei
                                          
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                    </Col>
                                    ))
                                    
                              }
                      
                      
                    </Row>
                   
                </Container>  
            
            </div>

    )
}
export default EditClient
