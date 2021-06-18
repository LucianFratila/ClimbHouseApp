import React from 'react';
import axios from 'axios';

import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

// import {Link} from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


export default class EditGymPrice extends React.Component {
    
    constructor(props){
        super(props);

        this.onChangeProductName=this.onChangeProductName.bind(this);
        this.onChangeProductPrice=this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state={
            products:[],
            adult:'',
            kid:'',
           
        }
        
    }
    
    componentDidMount() {
        
        axios.get(`${SERVER_URL}/settings/`)
            
            .then((result)=>{
                this.setState({
                    adult:result.data.settings[0].adultPrice,
                    kid:result.data.settings[0].kidPrice
            }) 
            },
            (error) => {
                console.log(error);
            }
            )
        
      }

    
    
    
    onChangeProductName(e){
        this.setState({
            adult: e.target.value
        })
    }

    onChangeProductPrice(e){
        this.setState({
            kid: e.target.value
        })
    }

    async onSubmit(e){
        e.preventDefault();
        const newProduct= {
            adultPrice: this.state.adult,
            kidPrice: this.state.kid, 
        }
        
        try {
           await axios.post(`${SERVER_URL}/settings/edit/5fca11b76d4bcc2cc0d6b9ab`,newProduct)
        } catch (error) {
            console.log(error);
        }
        

        
        

        this.props.sendRefresh()
        
    }

    render(){
        
        return(
                
                <Form onSubmit={this.onSubmit} inline>
                    <span>{this.adult}</span>
                <Form.Row className="align-items-center">
                    <Col xs="auto">
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Adults</InputGroup.Text>
                        </InputGroup.Prepend>   
                    <Form.Control
                        
                        type='number' 
                        min='0'
                        id="inlineFormInput"
                        style={{width:'100px'}}
                        placeholder={`Adults: ${this.state.adult}`}
                        value={this.state.adult}
                        onChange={this.onChangeProductName}
                    />
                    </InputGroup>
                    </Col>

                    <Col xs="auto">
                    
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Kids</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                         
                        type='number' 
                        min='0'
                        style={{width:'100px'}} 
                        value={this.state.kid}
                        onChange={this.onChangeProductPrice}
                        id="inlineFormInputGroup" 
                        placeholder="Kids" />
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