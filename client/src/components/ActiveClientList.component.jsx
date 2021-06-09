import React, {useEffect,useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import StopButton from './StopButton.component'
import StartButton from './StartButton.component'
import ResetButton from './ResetButton.component'
import InsertClimbers from './InsertClimbers.component'
import PauseButton from './PauseButton.component'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import CardGroup from 'react-bootstrap/CardGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';







const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function MyVerticallyCenteredModal(props) {
    const [id4Start,setId4Start]=useState('')
    // const [inGym,setInGym]=useState();
    // console.log(props.totalInGym);
    // console.log(props.refresh);
    
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
            Results: {props.no}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Container>
        <Row>
            <Col sm={4}>
                <div className="scrollableContent">
                    
                {
                    props.clients.map(item=>(
                        
                        <ListGroup key={item._id} variant="flush">
                        
                        <ListGroup.Item  action onClick={()=>setId4Start(item._id)} >{item.name}</ListGroup.Item>
                        
                        </ListGroup>
                        
                    )
                        
                    )
                }
                </div>
            </Col>
            <Col sm={8}>
            <span>
            <Search4ActiveCard nos={props.totalInGym} refresh={props.refresh}  id2Search={id4Start}/>
            </span>
            
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



  function Search4ActiveCard({id2Search,refresh,nos}) {
    const [adults,setAdults] = useState(0);
    const [kids,setKids] = useState(0)
    const [totalClimbers,setTotalClimbers]=useState(0)
    const[client,setClient] = useState(null);
    const[loading,setLoading]=useState(false);
    const onChangeAdults=(e)=>{
        setAdults(e.target.value)
        }
    const onChangeKids=(e)=>{
        setKids(e.target.value)
        }


    const insert =async ()=>{


        try {
        const url = `${SERVER_URL}/clients/update-numbers/`+id2Search;
        setLoading(true)
        const response = await axios({
            method: 'POST',
            url: url,
            data:{
                adults:adults,
                kids:kids
            },
            
          })
          } catch (err) {
            console.log('Some error, please stop that!!!');
            console.log('--------------------------------');
            console.log(err);
            
          }
          setLoading(false)
        
    }
      
       

        const onSubmit = (e) => {
            e.preventDefault();
            insert()
            setTotalClimbers(adults+kids)
        
        };

    
    


    function getFetchUrl(id) {
        return `${SERVER_URL}/clients/4active/${id}`;
      }


      useEffect(()=>{
            
        setLoading(true)  
        let mounted = true;
        
        if(mounted){
            async function fetchData() {
                const result = await axios.get(getFetchUrl(id2Search))
                setClient(result.data.client);
                setLoading(false)
                setTotalClimbers(0)
                setAdults(0)
                setKids(0)
                // console.log(result.data);
                
                
                
              }
              if (id2Search!=='') {
                fetchData()
                refresh()
            } 
              
        }
        
        return ()=>{
            mounted = false
            
            
        } 
    
    
        
    },[id2Search,nos,totalClimbers])

    // console.log(client);
    // console.log(client);
    if (client!==null) {
        return (
            <span>
                <Card
                    bg='dark'
                    
                    text='light'
                    style={{ width: '100%', height:'100%' }}
                    className="mb-2"
                >
                    <Card.Header>
                        {
                        loading===true
                        ?
                        'loading...'
                        :
                        client.timeIn>0?'Time is running':'Time is NOT running'
                        }
                        
                    </Card.Header>
                    <Card.Body>
                    <Card.Title>{client.name}</Card.Title>
                        {
                        client.timeIn>0
                        ?
                        `The time was started at:${client.startTime}`
                        :
                        <span>
                         {
                             client.noOfpeopleClimbing===0
                             ?
                            //  <InsertClimbers noAdult={client.adults} refresh={refresh} noKids={client.kids} ClientId={client._id} />
                            <span>
       

                                <Form onSubmit={onSubmit} inline >
                                
                                
                                <InputGroup size="sm" className="mb-2 mr-sm-2">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>Adults</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl style={{width:'60px'}} min="0" type='number' className="inlineFormInputGroupUsername2"  onChange={onChangeAdults} />
                                </InputGroup>
                                <InputGroup size="sm" className="mb-2 mr-sm-2">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>Kids</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl style={{width:'60px'}} min="0" type='number' className="inlineFormInputGroupUsername2"  onChange={onChangeKids} />
                                </InputGroup>

                                <Button
                                type="submit"
                                className="mb-2"
                                size="sm"
                                inline = 'true'
                                
                                >
                                Ok
                                </Button>
                            </Form>
                            </span>
                             :
                             <StartButton refresh={refresh} ClientId={id2Search} status={client.status} />

                         }   
                        
                        
                        </span>
                        }
                    </Card.Body>
                </Card>
                
                
            </span>
        );
        
    } else {
        return null
    }
    
  }









function ClientList(){

    

    

    const[alert, setAlert] = useState(false);
    const[clients,setClients] = useState([]);
    const[priceKids,setPriceKids]=useState(0);
    const[priceAdults,setPriceAdults]=useState(0);
    const[searchClients,setSearchClients]=useState([]);
    const[query,setQuery] = useState('');
    const[modal4SearchResults,setModal4SearchResults]=useState(false);
    const[reverseOrder,setReverseOrder]=useState(false)
    
    
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
        
      }, 30000);


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

      function getFetchUrl4ActiveSearch() {
        return `${SERVER_URL}/clients/search4active/?search=${query}`;
      }
      const onChangeSearch=(e)=>{
        setQuery(e.target.value)
        // console.log(e.target.value);
    }

      function getFetchUrl() {
        return `${SERVER_URL}/clients/active`;
      }
      useEffect(()=>{
            
          
        let mounted = true;
        
        if(mounted){
            async function fetchData() {
                const result = await axios.get(getFetchUrl())
                const searchResult = await axios.get(getFetchUrl4ActiveSearch())
                if (query==='') {
                    setSearchClients([])
                } else {
                    // console.log(searchResult.data.clients);
                    setSearchClients(searchResult.data.clients) 
                }
                
                setClients(result.data.clients);
                setPriceAdults(result.data.adultPrice);
                setPriceKids(result.data.kidPrice);
                
                
                
                
                
              }
              fetchData()
        }
        
        return ()=>{
            mounted = false
            
            
        } 
    
    
        
    },[alert,query,reverseOrder])

    // console.log(searchClients);
    // console.log(modal4SearchResults);

    const refresh = ()=>{
        setAlert(true)
        
    }



    
    const toggleFilterClients =(e)=>{
        e.preventDefault();
        setReverseOrder(reverseOrder===true?false:true)
    }


    // console.log(reverseOrder);



   
    return(
    <div>
        <Row > 
            <span style={{marginTop:'10px',marginLeft:'15px',marginRight:'15px'}}>
                <h3>Active Clients </h3>
                
                <span style={{verticalAlign:'middle',display:'table-cell'}}>Total Climbers in Gym: {totalClimbers>20?<span style={{color:'red',fontSize:'40px'}}>{totalClimbers}</span>:<span style={{color:'green',fontSize:'40px'}}>{totalClimbers}</span>}</span>
            </span>

            
        </Row>
        <Row style={{marginTop:'10px',marginLeft:'15px',marginRight:'15px'}}>
        <Form  inline >
        
        {/* <Form.Label className="inlineFormInputGroupUsername2" srOnly>
            Email
        </Form.Label> */}
        <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl  className="inlineFormInputGroupUsername2" type="text"  onChange={onChangeSearch} />

            <Button
                onClick={() => setModal4SearchResults(true)} 
                variant={searchClients.length===0?'danger':'success'}
                disabled={searchClients.length===0?true:false}
            >
                Results: {searchClients.length} {searchClients.length===0?'':' / Show Results'}
            </Button>
            <span style={{marginLeft:'20px'}}>
            Filter by entry time <Button variant='info' onClick={toggleFilterClients}>{reverseOrder===false?<FaArrowCircleUp/>:<FaArrowCircleDown/>}</Button>
            </span>
            

            <MyVerticallyCenteredModal
                totalInGym={totalClimbers}
                show={modal4SearchResults}
                handleClose={() => setModal4SearchResults(false)}
                onHide={() => setModal4SearchResults(false)}
                clients={searchClients}
                no={searchClients.length}
                refresh={refresh}
            /> 

        </InputGroup>
        
    </Form>

        </Row>
        <Row style={{marginTop:'10px'}} xl={3} lg={2} md={2} sm={1} xs={1}>
        {/* reverseOrder,setReverseOrder  */}
        
        {
            clients.sort((a,b)=> reverseOrder===false ? b.timeIn<a.timeIn : a.timeIn<b.timeIn ? 1 : -1).map( client=>(
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
                            <span>
                                <span style={{marginLeft:'3px', fontSize:'25px',}}>{client.name}</span>
                                <span style={{fontSize:'15px',color:'white',marginLeft:'10px'}}>
                                    (Adults:{client.adults}・Kids:{client.kids})
                                </span>
                            </span>
                            
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
                                        <span style={{fontSize:'20px',color:'white', marginRight:'10', fontWeight:'bolder'}}>
                                           ~ {client.finalTime}/min @ {client.due}/lei
                                        </span>
                                        :
                                            client.pausedStatus === false
                                            ?
                                            
                                            <span style={{fontSize:'15px',color:'white', marginRight:'10px'}}>
                                                {

                                                ctime(client.totalPaused,calculateMins(Date.now(),client.timeIn))<35
                                                ?
                                                <span>{ctime(client.totalPaused,calculateMins(Date.now(),client.timeIn))} / min - aprox. {(client.kids*priceKids)+(client.adults*priceAdults)} / lei</span>
                                                :
                                                // let a = 0 //nr copii
                                                // let b = 2 //nr adulti
                                                // let c = 20 //pret copii
                                                // let d = 25 //pret adulti

                                                // let y = 179//timp scurs in minute

                                                // let x = (a*c)+(b*d)
                                                // let z // pret final rotunjit in sus
                                                // a*(c+(Math.ceil((y-35)/15))*5) + b*(d+(Math.ceil((y-35)/15))*5)
                                                <span>
                                                    {ctime(client.totalPaused,calculateMins(Date.now(),client.timeIn))} / min - aprox. {
                                                    client.kids*(priceKids+(Math.ceil((ctime(client.totalPaused,calculateMins(Date.now(),client.timeIn))-35)/15))*5)
                                                    +
                                                    client.adults*(priceAdults+(Math.ceil((ctime(client.totalPaused,calculateMins(Date.now(),client.timeIn))-35)/15))*5)
                                                    } / lei
                                                </span>
                                                
                                                }
                                            </span>

                                            
                                            :
                                            <span style={{marginRight:'10px',fontSize:'15px', color:"red"}}>
                                                 {client.elapsedOnPaused}/min
                                            </span>
                                        }

                                       



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
                                <span>
                                <ButtonGroup size="lg" className="mb-2">
                                {/* <StartButton ClientId={client._id} refresh={refresh} status={client.status} /> */}
                                <PauseButton ClientId={client._id} refresh={refresh} timeOut={client.timeOut} name={client.name} status={client.status} paused={client.pausedStatus}/>
                                <StopButton ClientId={client._id} refresh={refresh} timeOut={client.timeOut} status={client.status} name={client.name} paused={client.pausedStatus}/> 
                                    
                                </ButtonGroup>
                                <span style={{float:'right'}}>
                                <ResetButton ClientId={client._id} refresh={refresh} name={client.name} due={client.due} time={client.finalTime}/>
                                </span>
                                
                                </span>
                                

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





