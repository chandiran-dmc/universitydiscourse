import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
const axios = require('axios');


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      emailValid: false
    };
  }
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
      return <Redirect to="/mp" push />
    
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  sendEmail = (event) => {

    event.preventDefault();
    if (this.state.email === '') {
      this.setState({
        
      });
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:3001/api/recover',
        data: {
            email: this.state.email
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
    localStorage.setItem('email', this.state.email);
  }
  onSubmit = (event) => {
    event.preventDefault();
    alert('Authentication coming soon!');
    axios({
        method: 'post',
        url: 'http://localhost:3001/api/register',
        data: {
            email: this.state.email,
            password: this.state.password
        }
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
    
    //this.renderRedirect();
  }
  render() {
    let email2 = localStorage.getItem('email');
    if (email2) {
      alert('checkcheck');
    }
    
    return (

      <form onSubmit={this.sendEmail}>
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
       <input type="submit" value="Submit" onClick={this.renderRedirect}/>
       <div>
         {this.state.emailValid ? (
          <h1>Email format is wrong!</h1>): (<h1></h1>)
        }
       </div>
       
       
      </form>
      
    );
  }
}
