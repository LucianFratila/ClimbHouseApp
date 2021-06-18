import React, {Component,useEffect,useState} from 'react';
import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstraps/Col';
// import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function ProductsSelectForm(props){

    const [selectedOption, setSelectedOption] = useState(0)
    const [qty, setQty] = useState(0)
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
      
    
      
    useEffect(() => {
      if (isLoading) {
        insert().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);
   
    const onSubmit = (e) => {
        e.preventDefault();
        
        
        
        
        setLoading(true)
        // setShow(false)
        props.refresh()
        // insert()
    
    };

    
        const handleChangeSelect=(e)=>{
            setSelectedOption(e.target.value)
            }
        const handleChangeQty=(e)=>{
            setQty(e.target.value)
            }
        const insert =async ()=>{
    
    
            try {
            const url = `${SERVER_URL}/clients/update-prods/` + props.clientId;
            let text = qty;
            let integer = parseInt(text, 10);
            const response = await axios({
                method: 'POST',
                url: url,
                data:{
                    id:selectedOption,
                    qty: integer
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
    

    props.transfer(selectedOption)

    return(
        <span>
            {/* {
            show 
            ?
            <span style={{zIndex:'1',position:'relative'}} variant="danger" onClose={() => setShow(false)} >
            <Alert.Heading>Some error ! </Alert.Heading>
            <p>
            Please select a product.
            </p>
            </Alert>
            :
            null
        } */}
        <Form onSubmit={onSubmit}  inline>
            <Form.Group style={{display:'flex', padding: '10px '}}   >
           
            <Form.Control required onChange={handleChangeSelect} style={{backgroundColor:'black',color:'white'}} as="select" size="lg" custom>
            {props.products.map((option) => (
            <option    key={option._id} value={option._id}>{option.productName}-{option.price}lei</option>
            ))}
            </Form.Control>
            
            <Form.Control required onChange={handleChangeQty} style={{backgroundColor:'black',color:'white', width:'100px'}} min='0' type="number" placeholder="0" size="lg" />
            <Button
            type="submit"
            size="lg"
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
            </span>
            
            : 'Send'}
            </Button>
           
            </Form.Group>
            
        
            
        </Form>
        </span>
    )
}





export default ProductsSelectForm