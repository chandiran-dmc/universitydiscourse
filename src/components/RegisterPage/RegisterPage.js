/**
 * This page is the main feed page
 * The user should arrive to this page after logging in,
 * clicking on the university discourse icon, etc.
 * 
 * This page should consist of:
 * - top bar = search bar, user profile image button, etc. 
 * - action bar = a bar that includes buttons to create post,
 *                filter posts, etc.
 * - posts from the tags that the user follows
 * - tags that the user follows
 */

import React, { Component } from 'react'
import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';
import logo from '../../images/image1.png';
import './RegisterPage.css'
import logoName from '../../images/ImageName.png';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'
import {Redirect} from 'react-router-dom';
const axios = require('axios');

const theme = createMuiTheme ({
    palette: {
        primary: {
            main:'#F2B705',
        }
    }

});

export default class RegisterPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
          email : '',
          username: '',
          password: '',
          redirect: false
        };
        this.handleEmailChange = this.handleChange.bind(this, 'email');
        this.handleUsernameChange = this.handleChange.bind(this, 'username');
        this.handlePasswordChange = this.handleChange.bind(this, 'password');
      }

    handleChange(keyName, e) {
        this.setState({ [keyName]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        // Check for email and password format
        if (!this.state.email.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+/g)) {
            alert('Email format not correct');
            return;
        }

        if (this.state.password.length < 8 || !this.state.password.match(/[0-9]/g)) {
            alert('Password format not correct');
            return;
        }

        axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/register',
            data: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }
        })
        .then((response) => {
            console.log(response);
            localStorage.setItem('email', this.state.email);
            this.setState({redirect: true});
        })
        .catch((error) => {
            console.error(error);

            alert('User alreader registered!');
            
            // Catch for user that is not registered
            if (error.message.includes("not registered")) {
                alert('User already exists!');
                return;
            }

        });
    }    

    onClickCreate() {
        alert('hi');
    }

    render() {

        if (this.state.redirect === true) {
            return <Redirect from="/rp" push to={{
                pathname: "/mp",
                state: {type: this.state.type}
            }}/>;
        }
        return (
            <form onSubmit={this.onSubmit}>
            <div>
                <TopBar />
                <Footer />
                {/* <div className="LoginPage">
                <form>
                <div className="Form">
                <img 
                        className="LoginLogo"
                        src={logo}
                        alt="logo"
                    />
                <h1 className="LoginText">Register</h1>
                    <input type="text"
                    placeholder="the_jane@gmail.com"/>
                    <br />
                    <input 
                        className="NEXTButton"
                        type="submit" 
                        value="NEXT" 
                    />
                </div>
                </form>
                

                    
                </div> */}
                <div class="grid-container1" >
                        <div class="grid-item">
                            <img 
                                className="LoginLogo"
                                src={logo}
                                alt="logo" /> 
                            <br />
                        </div>
                        <div class="grid-item">
                            <img 
                                className="LogoName2"
                                src={logoName}
                                alt="logoName"/>
                        </div>
                        </div>
                        <h1 className="RegisterText">Register</h1>
                        <div class="grid-container2R" >
                            <div class="grid-item">
                                <TextField
                                    required
                                    id="filled-required"
                                    label="email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                    variant="filled" />
                            </div>
                            <br />
                            <div class="grid-item">
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Username"
                                    variant="filled"
                                    //name = "email"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                
                                     />
                            </div>
                            <br />
                            <div class="grid-item">
                                <TextField
                                    required
                                    id="filled-password-input"
                                    label="Password"
                                    name = "Password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    // value={this.state.password}
                                    // onChange={this.handlePasswordChange}
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled" />
                            </div>
                            < br />
                            
                            <div class="grid-item">
                                <ThemeProvider theme={theme}>
                                <Button 
                                    className  = "NEXT" 
                                    variant = "contained"
                                    color = "primary"
                                    type = "submit" >
                                    SIGN UP
                                </Button> 
                                </ThemeProvider>
                            </div>
                        </div>
            </div>
            </form>
            
        )
    }
}
