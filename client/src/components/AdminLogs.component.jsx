
import React, {useEffect,useState,useRef} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;




function AdminLogs(props) {
    const [log,setLog] = useState([])
    const [isLoading,setLoading] = useState(false)

    console.log(isLoading);

    const deleteAllLogs =async ()=>{

        
        try {
        const url = `${SERVER_URL}/admins/delete/alllogs`;
        setLoading(true)
        const response = await axios({
            method: 'POST',
            url: url,
            
            
          })
          } catch (err) {
            console.log(err);
            
          }
        
        setLoading(false)
         
        
    }
    
    const onSubmitDeleteAllLogs = () =>{
        deleteAllLogs()
    }
    // console.log(props.match.params.firebaseID);
    useEffect(()=>{
        let mounted = true;
        if(mounted){
            async function fetchData() {
                function getFetchUrl() {
                    return `${SERVER_URL}/admins/` ;
                  }
                const result = await axios.get(getFetchUrl());
                let datalogs
                try {
                    
                    datalogs = result.data.log[0].activityHistory.logs
                    setLog(datalogs)
                } catch (error) {
                    console.log('Error: No logs yet');
                }
              }
              fetchData()
        }
        
        return ()=> mounted = false
           
        
         
        
    },[isLoading])
    
    let allTimeTotals = log.reduce((accumulator, current) => accumulator + current.due, 0);
    
    
    return(
        
            <div>
               
                <Container >
                
                    <Row xl={1} lg={1} md={1} sm={1} xs={1} style={{backgroundColor:'#404040'}} >
                        <Col>
                        <h5>Logs / All Time : {`${allTimeTotals} lei`} </h5>
                        {/* <Button variant='danger' onClick={onSubmitDeleteAllLogs}>
                            {
                            isLoading===true
                            ?
                            `Deleting`
                            :
                            `Delete all Logs`
                            }
                            
                        </Button> */}
                        </Col>
                        <Col>{
                            log.length===0
                            ?
                            <span>No Logs yet</span>
                            :
                            <span>{`Entries: ${log.length}`} </span>
                        }</Col>
                        
                        {
                                log.sort((a,b)=>a.timestamp<b.timestamp? 1 : -1).map((item) => (
                                    
                                    <ListGroup key={item._id} as="ul">
                                        <ListGroup.Item variant="dark" style={{color:'black'}} as="li">
                                            <span style={{fontSize:'12px'}}><b>{item.start}</b> - Admin: {item.adminEmailName} - Client: {item.clientName} - Time: <b>{item.time} min @ {item.due} lei </b></span>
                                        </ListGroup.Item>
                                        
                                    </ListGroup>
                                    
                                    ))
                                    
                        }

                        
                        
                    </Row>
                    
                   
                </Container>  
            
            </div>

    )
}
export default AdminLogs
