import React from "react";
import axios from "axios";

import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

// import {Link} from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default class EditGymPrice extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeAdults = this.onChangeAdults.bind(this);
    this.onChangeKids = this.onChangeKids.bind(this);
    this.onChangeMiniKids = this.onChangeMiniKids.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      products: [],
      adult: "",
      kid: "",
      miniKidPrice: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_URL}/settings/`)

      .then(
        (result) => {
          this.setState({
            adult: result.data.settings[0].adultPrice,
            kid: result.data.settings[0].kidPrice,
            miniKidPrice: result.data.settings[0].miniKidPrice,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChangeAdults(e) {
    this.setState({
      adult: e.target.value,
    });
  }

  onChangeKids(e) {
    this.setState({
      kid: e.target.value,
    });
  }
  onChangeMiniKids(e) {
    this.setState({
      miniKidPrice: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const newProduct = {
      adultPrice: this.state.adult,
      kidPrice: this.state.kid,
      miniKidPrice: this.state.miniKidPrice,
    };

    try {
      await axios.post(`${SERVER_URL}/settings/edit/5fca11b76d4bcc2cc0d6b9ab`, newProduct);
    } catch (error) {
      console.log(error);
    }

    this.props.sendRefresh();
  }

  render() {
    return (
      <Form style={{width: "40%"}} onSubmit={this.onSubmit}>
        <span>{this.adult}</span>
        
          <Col xs='auto'>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>Adults</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='number'
                min='0'
                id='inlineFormInput'
                style={{ width: "100px" }}
                placeholder={`Adults: ${this.state.adult}`}
                value={this.state.adult}
                onChange={this.onChangeAdults}
              />
            </InputGroup>
          </Col>

          <Col xs='auto'>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>Kids</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type='number'
                min='0'
                style={{ width: "100px" }}
                value={this.state.kid}
                onChange={this.onChangeKids}
                id='inlineFormInputGroup'
                placeholder='Kids'
              />
            </InputGroup>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>MiniKids</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type='number'
                min='0'
                style={{ width: "100px" }}
                value={this.state.miniKidPrice}
                onChange={this.onChangeMiniKids}
                id='inlineFormInputGroup'
                placeholder='MiniKids'
              />
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <Button type='submit' className='mb-2'>
              Submit
            </Button>
          </Col>
        
      </Form>
    );
  }
}
