import React, {Component,useEffect,useRef,useState} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import axios from 'axios';

import ReCAPTCHA from 'react-google-recaptcha'
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function CreateClient(props){
    const [capchaOK, setCapchaOk] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const reRef = useRef();
    
    // console.log(submitted);

    const create =async ()=>{


        try {
        
        const url = `${SERVER_URL}/clients/add`;
        const token = await reRef.current.getValue();///for capcha
        // console.log(token);
        const response = await axios({
            method: 'POST',
            url: url,
            data:{
                name,
                email,
                phone 
            },
            
          })
          setSubmitted(true);
          } catch (err) {
            console.log('Some error, please stop that!!!');
            console.log('--------------------------------');
            console.log(err);
            
            setShow(true)
            setTimeout(()=>{setShow(false)},5000)
          }
          setLoading(false)
          setTimeout(()=>{setSubmitted(false)},5000)
        
    }
  
        
      
        const onChangeClientName=(e)=>{
            setName(e.target.value)
            }
        const onChangeClientPhone=(e)=>{
            setPhone(e.target.value)
            }
        const onChangeClientEmail=(e)=>{
            setEmail(e.target.value)
            setShow(false)
            }
        
        

        const onSubmit = (e) => {
            e.preventDefault();
            
                        
                        create()
                        setLoading(true)
                        setName('');
                        setPhone('');
                        setEmail('')
                        
                        props.refresh()
           
        
        };
        
        
        

        const CapchaOk = ()=>{
            if (capchaOK==false) {
                setCapchaOk(true)
            } else {
                setCapchaOk(false)
            }
        }
    
    


    return(
        
    <span style={{width:'100%'}}>
        {
            submitted===true
            ?
            <Alert  variant='success'>
            Date trimise.
            </Alert>
            :
            null

        }
         
        {
            show 
            ?
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Some error. Please stop that! </Alert.Heading>
            <p>
            Email or phone is taken.
            </p>
            </Alert>
            :
            null
        }
        
        <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={reRef} onChange={CapchaOk} />
        <Form onSubmit={onSubmit}  >
        
        
       
        <InputGroup size="lg"  className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>Nume</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl disabled={!capchaOK} id="name" required type="text" value={name} placeholder="ex: Ion Popescu" onChange={onChangeClientName} />
        </InputGroup>
       
    <InputGroup size="lg"  className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl disabled={!capchaOK} id="email" required type="email" value={email} placeholder="ex: popescu@gmail.com" onChange={onChangeClientEmail} />
        </InputGroup>
        <InputGroup size="lg" className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>Telefon</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl disabled={!capchaOK} id="phone" required type="tel" value={phone} placeholder="ex: 0727 111 222" onChange={onChangeClientPhone} />
        </InputGroup>
        
        <Button
        block
        size="lg"
        type="submit"
        className="mb-2"
        disabled={!capchaOK}
        
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
         
        : 'Trimite'}
        </Button>
        
    </Form>
    </span>
    

    )
}





export default CreateClient