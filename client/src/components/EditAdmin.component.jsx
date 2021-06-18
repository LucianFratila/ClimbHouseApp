
import React, {useEffect,useState,useContext} from 'react';
import axios from 'axios';
import app from "../base";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { FaEnvelope,FaUserCircle,FaInfo } from 'react-icons/fa';

import { AuthContext } from "../Auth"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;




function EditAdmin(props) {
    const {currentUser} = useContext(AuthContext)
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [log,setLog] = useState([])
    // console.log(props.match.params.firebaseID);
    useEffect(()=>{
        let mounted = true;
        if(mounted){
            async function fetchData() {
                function getFetchUrl() {
                    return `${SERVER_URL}/admins/${currentUser.uid}` ;
                  }
                const result = await axios.get(getFetchUrl());
                // console.log(result.data.data.admin.activityHistory);
                setEmail(result.data.data.admin.email);
                setName(result.data.data.admin.name);
                setLog(result.data.data.admin.activityHistory)
                

                
                
              }
              fetchData()
        }
        
        return ()=> mounted = false
           
        
         
        
    },[])
    
    const onChangeAdminName = (e)=>{
        e.preventDefault()
        setName(e.target.value);
    }

    const onSubmitAdminName = (e)=>{
        e.preventDefault()
        const obj = {
            name
        }
        async function postName(){
            await axios.post(`${SERVER_URL}/admins/update/${currentUser.uid}`,obj)
        }
        postName()
    }

    let user = app.auth().currentUser;
    // console.log(user);

    return(
        
            <div>
               
                <Container >
                    <Row >
                        <Col  style={{backgroundColor:'#2b2b2b',display: 'flex',alignItems:'center'}} sm={5}><FaUserCircle size='1.4em'/><span style={{marginLeft:'5px',fontSize:'30px'}}></span>
                        
                            <Form style={{marginTop:'5px'}} onSubmit={onSubmitAdminName}  inline >

                            <Form.Label htmlFor="inlineFormInputName2" srOnly>
                                Name
                            </Form.Label>
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="inlineFormInputName2"
                                placeholder={name}
                                onChange={onChangeAdminName}
                                required
                            />


                            <Button type="submit" className="mb-2">Edit</Button>
                            </Form>
                        
                        </Col>
                        <Col  style={{backgroundColor:'#2f2e2e',display: 'flex',alignItems:'center'}} sm={7}><FaEnvelope/> <span style={{marginLeft:'5px'}}>{email} / {name}</span> </Col>
                        
                        
                    </Row>
                    <Row>
                    <Col  style={{backgroundColor:'gray',display: 'flex',alignItems:'center'}} ><FaInfo/><span style={{marginLeft:'5px'}}>{`Email Verified: ${user.emailVerified} | Last SignInTime: ${user.metadata.lastSignInTime}`}</span> </Col>
                    </Row>
                    <Row xl={1} lg={1} md={1} sm={1} xs={1} style={{backgroundColor:'#404040'}} >
                        <Col><h5>Log for {email} </h5></Col>
                        
                        {
                                log.sort((a,b)=>a.timestamp<b.timestamp? 1 : -1).map((item) => (
                                  <Col key={item._id}>
                                      <Card
                                      bg='secondary'
                                      style={{width:'auto',marginTop:'10px',marginBottom:'10px'}}
                                      text='light'
                                      
                                      
                                    >
                                    <Card.Header>{item.clientName}<span style={{float:'right'}}></span></Card.Header>
                                      <Card.Body>
                                        
                                        <Card.Text>
                                          <b>{item.start}</b>/ {item.time} min  = <b>{item.due}</b> lei
                                          
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
export default EditAdmin
