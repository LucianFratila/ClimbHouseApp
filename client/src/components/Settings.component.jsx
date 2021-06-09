import React, {useEffect,useState} from 'react';
import axios from 'axios';
import CreateProduct from './CreateProduct.component'
import EditGymPrice from './EditGymPrice.component'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { RiChatDeleteLine } from "react-icons/ri";
// import {Link} from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function Settings(props){
    const [refresh,setRefresh] = useState(false)
    const [prods,setProds] = useState([])

    const refreshFunction = ()=>{
        if (refresh===false) {
            setRefresh(true)
        } else {
            setRefresh(false)
        }
        
    }
    const deleteProduct =async (id)=>{
        const url = `${SERVER_URL}/products/delete/`+ id;
        try {
            await axios(url,{
                method: 'DELETE',
            }) 
        } catch (error) {
            console.log(error);
        }
        
        refreshFunction()
    }

    function Url() {
        return `${SERVER_URL}/products`;
      }
    async function getProds(){
        try {
        const results = await axios(Url())
        // console.log(results.data.length);
        setProds(results.data)
        } catch (error) {
        console.log(error); 
        }
        
    }
    useEffect(()=>{
        getProds()
    },[refresh])
    
    return(
        
            <Container >
            <Row xl={2} lg={2} md={1} sm={1} xs={1} >
                <Col>
                    <h3>Create product</h3>
                    <CreateProduct sendRefresh={refreshFunction}/>
                </Col>
                <Col>
                    <h3>Edit gym price / per 30 min</h3>
                    <EditGymPrice sendRefresh={refreshFunction}/>
                </Col>
                
            
            
            </Row>
            <Row style={{backgroundColor:'#2b2b2b',display: 'flex',alignItems:'center'}} xl={3} lg={3} md={2} sm={1} xs={1}>
                
                {
                    prods.map(item=>(
                        <Col key={item._id}>
                            <Card
                            bg='secondary'
                            style={{width:'100%',marginTop:'10px',marginBottom:'10px'}}
                            text='light'
                            
                            
                        >
                        <Card.Header><b>{item.productName}</b> - {item.price} lei<span style={{float:'right'}}><Button onClick={()=>deleteProduct(item._id)} variant="danger" size="sm"><RiChatDeleteLine size='1.4em' /></Button></span></Card.Header>
                            {/* <Card.Body>
                            <Card.Text>
                                Text
                            </Card.Text>
                            </Card.Body> */}
                        </Card>
                        </Col>
                    ))
                }
                
            </Row>
            </Container>
        
    )
}

export default Settings