import React, { Component } from 'react';
const axios = require('axios');

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    alert('Authentication coming soon!');
    let email = localStorage.getItem("email");
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
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
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
       <input type="submit" value="Submit"/>
      </form>
    );
  }
}
