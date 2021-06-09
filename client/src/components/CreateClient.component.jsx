import React, {Component,useEffect,useRef,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ReCAPTCHA from 'react-google-recaptcha'
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function CreateClient(props){

    const create =async ()=>{


        try {
        const url = `${SERVER_URL}/clients/add`;
        const token = await reRef.current.getValue();
        // console.log(token);
        const response = await axios({
            method: 'POST',
            url: url,
            data:{
                name,
                email 
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
        const [name,setName] = useState('');
        const [email,setEmail] = useState('');
        const [phone,setPhone] = useState('');
        const [show, setShow] = useState(false);
        const reRef = useRef();
      
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
            confirmAlert({
                title: 'Create user!',
                message: `${name} / @: ${email} / tel: ${phone}`,
                buttons: [
                  {
                    label: 'Yes',
                    onClick: (e) => {
                        
                        create()
                        setLoading(true)
                        setShow(false)
                        props.refresh()
                    }
                  },
                  {
                    label: 'No',
                    onClick: () => props.refresh()
                  }
                ],
                overlayClassName: "../index.css"
              })
        
        };
        
        const[capchaOK, setCapchaOk] = useState(false)
        

        const CapchaOk = ()=>{
            if (capchaOK==false) {
                setCapchaOk(true)
            } else {
                setCapchaOk(false)
            }
        }
    
    


    return(
        
    <span>
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
        <Form onSubmit={onSubmit} inline >
        
        
        <Form.Label htmlFor="inlineFormInputName2" srOnly>
            Name
        </Form.Label>
        <Form.Control
            disabled={!capchaOK}
            className="mb-2 mr-sm-2"
            id="inlineFormInputName2"
            placeholder="Ion Popescu"
            onChange={onChangeClientName}
            required
        />
        <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
            Email
        </Form.Label>
        <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl disabled={!capchaOK} id="inlineFormInputGroupUsername2" type="email" placeholder="Email" onChange={onChangeClientEmail} />
        </InputGroup>
        <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>#</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl disabled={!capchaOK} id="inlineFormInputGroupUsername2" type="tel" placeholder="Phone" onChange={onChangeClientPhone} />
        </InputGroup>
        
        <Button
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
         
        : 'Submit'}
        </Button>
        
    </Form>
    </span>
    

    )
}





export default CreateClient