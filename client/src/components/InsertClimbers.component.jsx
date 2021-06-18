import React, {Component,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner'

import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function InsertClimbers(props){
    const onChangeAdults=(e)=>{
        setAdults(e.target.value)
        }
    const onChangeKids=(e)=>{
        setKids(e.target.value)
        }
    const insert =async ()=>{


        try {
        const url = `${SERVER_URL}/clients/update-numbers/`+props.ClientId;
        
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
            setShow(true)
          }
          setLoading(false)
        
    }
  
        const [isLoading, setLoading] = useState(false);
        const [adults,setAdults] = useState(props.noAdult);
        const [kids,setKids] = useState(props.noKids)
        const [show, setShow] = useState(false);
      
        
        // useEffect(()=>{
        //     setAdults(props.noAdult)
        //     setKids(props.noKids)
        //     console.log('insret');
        // },[props.refresh()])
       

        const onSubmit = (e) => {
            e.preventDefault();
            
            
            
            
            setLoading(true)
            // setShow(false)
            props.refresh()
            insert()
        
        };
        
        

   
    
    


    return(
        
    <span>
       

        <Form onSubmit={onSubmit} inline >
        
        
        <InputGroup size="sm" className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>Adults</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl style={{width:'60px'}} min="0" type='number' className="inlineFormInputGroupUsername2" placeholder={props.noAdult} onChange={onChangeAdults} />
        </InputGroup>
        <InputGroup size="sm" className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>Kids</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl style={{width:'60px'}} min="0" type='number' className="inlineFormInputGroupUsername2" placeholder={props.noKids} onChange={onChangeKids} />
        </InputGroup>

        <Button
        type="submit"
        className="mb-2"
        size="sm"
        inline = 'true'
        
        >
            {isLoading ?
          <span>
          <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
          />
          <span style={{marginLeft:'5px'}}>Sending...</span>
          </span>
         
        : 'Ok'}
        </Button>
    </Form>
    </span>
    

    )
}





export default InsertClimbers