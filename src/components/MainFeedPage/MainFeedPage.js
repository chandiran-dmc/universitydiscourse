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
    // if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
    // {
    //   this.setState({emailValid: false})
    //   return;
    // }
    //alert('sent!');

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
    
    sessionStorage.setItem('email', this.state.email);
  }
  onSubmit = (event) => {
    event.preventDefault();
    alert('Authentication coming soon!');
    //let email = localStorage.getItem("email");
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
