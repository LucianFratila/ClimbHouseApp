
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
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'
import ProductsSelectForm from './ProductsSelectForm.component'
import SubscriptionButton from './SubscriptionButton.component'
import DeleteProdsHistory from './DeleteProdsHistory.component'
import { FaEnvelope, FaUserCircle,FaUsers,FaCartPlus,FaCalendarCheck, FaPlay, FaTimes, FaClock, FaTools, FaPhone, FaDollarSign, FaSpinner } from 'react-icons/fa';
import { IoMdWalk,IoMdTimer, IoMdHourglass, IoIosFastforward,IoMdStopwatch } from "react-icons/io";
import StopButton from './StopButton.component'
import ResetButton from './ResetButton.component'
import { json } from 'body-parser';
import StopIndividual from './StopIndividual.component';
import ResetAfterEndButton from './ResetAfterEndButton.component';
import StopAll from './StopAll.component';
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


function CreateClimberModal(props) {
  const [name,setName]=useState('')
  const [climber,setClimber]=useState('adult')

  const create =async ()=>{


    try {
    
    const url = `${SERVER_URL}/clients/addClimber/${props.ownerId}`;

      await axios({
        method: 'POST',
        url: url,
        data:{
            name,
            climber
        },
        
      })
      } catch (error) {
        alert(error.response.data.message)
        
        
      }
      
    
}

const onChangeClientName=(e)=>{
  setName(e.target.value)
  }
const onChangeClimber=(e)=>{
  setClimber(e.target.value)
  
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    
                
                create()

                setName('');
                setClimber('')
                
                props.refresh()
   

};
useEffect(()=>{
  setClimber('adult')
},[props.show===false])
  
  
  return (
    <Modal
      
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Insert new Climber
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
      <Container>
      
          <InputGroup>
          <Form inline onSubmit={onSubmit}>
          
            <Form.Group >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"  placeholder="Enter name" onChange={onChangeClientName} />
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label style={{marginLeft:'5px'}}> Select kid or adult</Form.Label>
                <Form.Control onChange={onChangeClimber}   style={{width:'120px', marginLeft:'5px'}} as="select">
                
                  <option defaultValue="selected" value='adult'>adult</option>
                  <option value='kid'>kid</option>
                </Form.Control>
              </Form.Group>
              <Form.Text className="text-muted">

              </Form.Text>
            </Form.Group>

            
            
            <Button variant="success" type="submit">
              Insert
            </Button>
            
          </Form>
          </InputGroup>    
         
      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



function EditClientProvisional(props) {

    
    const [data,setData]=useState(()=>{});
    const [loading,setLoading]=useState(false);
    const [postStop,setPostStop]=useState(false);
    const [counter, setCounter] = useState(0);
    const [serverResponse,setServerResponse] = useState({show:false,data:''})
    const [dueTotal,setDueTotal]=useState(0)
    const [showHistory,setShowHistory]=useState(false)
    const [showCreateClimber,setShowCreateClimber]=useState(false)
    
  
    
    const refreshFunction=()=>{setPostStop(!postStop?true:false)}
    let trasnfer = (a) => {
      // console.log(a);
      return a
  }
    
      function calculateMins(a,b){
        let total
         
            if (b===0) {
                return total = 0
            } else {
                return total = (((a-b)/1000)/60).toFixed(0)
            }  
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
      }, 60000);


    function getFetchUrl(id) {
    return `${SERVER_URL}/clients/${id}`;
    }
    async function fetchData(){
        try {
            setLoading(true)
            const result = await axios.get(getFetchUrl(props.match.params.id))
            setData(result.data.data);
            // setDueTotal(dueList.reduce((prev, cur) => prev + cur.due, 0));
            setDueTotal(result.data.data.client.dueList.reduce((prev, cur) => prev + cur.due, 0));
            
            
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        
    }

    useEffect(()=>{
        let mounted = true
        if (mounted) {
            fetchData()
            setPostStop(false)
        }
        return ()=>{mounted = false}
    },[postStop])
    
    let totalHistory 
    if (data) {
      
        
        
      totalHistory = data.client.prodHistory.reduce(function(prev, cur) {
        return prev + cur.total;
        }, 0);
        
        
    }
     
    
    
    if (data) {
        return(
        
            <div>
                <CreateClimberModal
                  show={showCreateClimber}
                  handleClose={() => setShowCreateClimber(false)}
                  onHide={() => setShowCreateClimber(false)}
                  ownerId={data.client._id}
                  refresh={refreshFunction}
                />
                <MyVerticallyCenteredModal
                    name={data.client.name}
                    date={data.client.date}
                    data={data.client.sessionHistory}
                    show={showHistory}
                    handleClose={() => setShowHistory(false)}
                    onHide={() => setShowHistory(false)}
                    
                    
                />
                
                
                <Container fluid>
                    <Row >
                    <h4 style={{marginTop:'10px'}}><FaUserCircle size='1.4em'/>{data.client.name} - <FaEnvelope/> {data.client.email} -<FaPhone/> {data.client.phone} - <Button variant='info' onClick={()=>{setShowHistory(true)}}>History</Button></h4>
                    </Row>
                    <Row>
                    <h6>User: {data.client.status===true?'Active':'Not Active'} | <IoMdTimer size='1em'/> {data.client.startTime==='0'  ? <span>Time not started</span> : <span>{data.client.startTime}</span>}</h6>
                    </Row>
                    <Row>
                    
                    <h6>
                        {
                        data.client.kids === 0 && data.client.adults === 0 
                        ?
                        <span>0 clibers</span>
                        :
                        <span>{data.client.adults + data.client.kids}/{data.client.adultsRemaining + data.client.kidsRemaining} climbers  @ {data.client.adults} (remainig:{data.client.adultsRemaining}) adult(s) / {data.client.kids} (remaining:{data.client.kidsRemaining}) kid(s)</span>
                        } |
                        {data.client.finalTime > 0 ? <span> Final: {data.client.finalTime} min @ Due: {dueTotal} /lei</span> : <span> <IoMdTimer size='1em'/> {calculateMins(Date.now(),data.client.timeIn)} /min</span> }
                    </h6>
                    
                    </Row>
                    <Row style={{backgroundColor:'#242424',padding:'20px', borderRadius:'5px'}}>
                    <Col>
                    <span>
                        <span >
                        {/* <Button variant='danger' disabled={loading?true:false} onClick={stopAll}>{loading?'Loading...':'Stop All'}</Button> */}
                        <ButtonGroup size="lg" className="mb-2">
                        {/* {!data.client.status?null:data.client.timeOut>0?<ResetAfterEndButton ClientId={data.client._id} refresh={refreshFunction}/>:<StopAll ClientId={data.client._id} refresh={refreshFunction}/>} */}
                        <ResetAfterEndButton ClientId={data.client._id} refresh={refreshFunction}/>
                        <StopAll ClientId={data.client._id} due={dueTotal} refresh={refreshFunction}/>
                        <Button variant='info' onClick={()=>{setShowCreateClimber(true)}}>Insert Climber</Button>
                        </ButtonGroup>
                        <span style={{marginLeft:'5px', fontSize:'25px'}}>Total due for stopped time : <b>{dueTotal}</b> lei</span>
                        </span>
                        
                        <span style={{float:'right'}}>
                          <ResetButton ClientId={props.match.params.id} in={data.client.timeIn} out={data.client.timeOut} refresh={refreshFunction} paused={data.client.pausedStatus} due={data.client.due}  name={data.client.name}  time={data.client.finalTime}/> 
                          </span>
                    </span>
                    </Col>
                    
                    </Row>
                    <Row xl={2} lg={2} md={1} sm={1} xs={1} style={{height:'100px'}}>
                      <Col   style={{backgroundColor:'#2b2b2b',display: 'flex',alignItems:'center'}}>
                          <ProductsSelectForm clientId={props.match.params.id} products={data.products} refresh={refreshFunction} transfer={trasnfer}/>
                      </Col>
                      <Col   style={{backgroundColor:'#2b2b2b',display: 'flex',alignItems:'center'}}>
                          <span style={{fontSize:'20px'}}>
                            {
                            
                            `Total : ${totalHistory} lei + ${dueTotal} lei  = ${totalHistory+dueTotal} lei`
                            }
                            
                          </span>
                      </Col>
                    </Row>
                    <Row xl={4} lg={3} md={2} sm={2} xs={1} style={{backgroundColor:'#404040'}} >
                              {
                                data.climbers.map((item) => (
                                  <Col key={item._id}>
                                      <Card
                                      bg={item.status===true?'success':'danger'}
                                      style={{width:'auto',marginTop:'10px',marginBottom:'10px'}}
                                      text='light'
                                      
                                      
                                    >
                                    <Card.Header><h6>{item.name}</h6></Card.Header>
                                      <Card.Body>
                                        
                                      <h4>{item.status===true?<span> <IoMdTimer size='1em'/> {calculateMins(Date.now(),item.timeIn)} min</span>:<span><IoMdStopwatch size='0.9em'/> {item.finalTime} min | $: {item.due}lei</span>}</h4>
                                          
                                          
                                      <span><StopIndividual climberId={item._id} clientId={props.match.params.id} refresh={refreshFunction}/></span>
                                      </Card.Body>
                                    </Card>
                                    </Col>
                                    ))
                                    
                              }
                      
                      
                    </Row>
                    <Row xl={4} lg={3} md={2} sm={2} xs={1} style={{backgroundColor:'black'}} >
                              {
                                data.client.prodHistory.map((item) => (
                                  <Col key={item._id}>
                                      <Card
                                      bg='secondary'
                                      style={{width:'auto',marginTop:'10px',marginBottom:'10px'}}
                                      text='light'
                                      
                                      
                                    >
                                    <Card.Header>{item.productName}<span style={{float:'right'}}><DeleteProdsHistory clientId={props.match.params.id} refresh={refreshFunction} prodId={item._id} prodName={item.productName} prodQty={item.qty} prodTotal={item.total}/></span></Card.Header>
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
    } else {
        return <h5>Loading...</h5>
    }
    
}
export default EditClientProvisional
