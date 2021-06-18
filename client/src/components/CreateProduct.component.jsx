import React from 'react';
import axios from 'axios';

import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

// import {Link} from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


export default class Settings extends React.Component {
    
    constructor(props){
        super(props);

        this.onChangeProductName=this.onChangeProductName.bind(this);
        this.onChangeProductPrice=this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            products:[],
            product_name:'',
            product_price:'',
        }
       
    }
    
    onChangeProductName(e){
        this.setState({
            product_name: e.target.value
        })
    }

    onChangeProductPrice(e){
        this.setState({
            product_price: e.target.value
        })
    }

    async onSubmit(e){
        e.preventDefault();
        const newProduct= {
            productName: this.state.product_name,
            price: this.state.product_price, 
        }
        
        try {
           await axios.post(`${SERVER_URL}/products/add`,newProduct)
        } catch (error) {
            console.log(error);
        }
        

        
        this.setState({
            product_name:'',
            product_price:''
        })

        this.props.sendRefresh()
    }

    render(){
        
        return(

                <Form onSubmit={this.onSubmit} inline>
                <Form.Row className="align-items-center">
                    <Col xs="auto">
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Product Name"
                        value={this.state.product_name}
                        onChange={this.onChangeProductName}
                    />
                    </Col>
                    <Col xs="auto">
                    <InputGroup className="mb-2">
                        <FormControl 
                        type='number' 
                        min='0' 
                        value={this.state.product_price}
                        onChange={this.onChangeProductPrice}
                        id="inlineFormInputGroup" 
                        placeholder="Price" />
                    </InputGroup>
                    </Col>
                    <Col xs="auto">
                    <Button type="submit" className="mb-2">
                        Submit
                    </Button>
                    </Col>
                </Form.Row>
                </Form> 
        )
    }
}