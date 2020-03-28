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
import logoName from '../../images/ImageName.png';
import './RecoverPassword.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { Redirect } from 'react-router-dom';

import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'
const axios = require('axios');

const theme = createMuiTheme ({
    palette: {
        primary: {
            main:'#F2B705',
        }
    }

});
export default class RecoverPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email : '',
            newpassword: '',
            repeat: '',
            redirect: false,
            correctemail: window.location.href.substr( window.location.href.indexOf("=") + 1)
        };

        this.handleEmailChange = this.handleChange.bind(this, 'email');
        this.handleNewPasswordChange = this.handleChange.bind(this, 'newpassword');
        this.handleRepeatChange = this.handleChange.bind(this, 'repeat');
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

        if (this.state.email !== this.state.correctemail) {
            alert('You cannot change others\' password');
            return;
        }

        if (this.state.newpassword.length < 8 || !this.state.newpassword.match(/[0-9]/g)) {
            alert('Password format not correct');
            return;
        }

        if (this.state.newpassword !== this.state.repeat) {
            alert('New password and confirm password does not match');
            return;
        }

        axios({
            method: 'post',
            url: 'https://unidiscourse-backend.herokuapp.com/api-user/recoverpassword',
            data: {
                email: this.state.email,
                newpassword: this.state.newpassword,
            }
        })
        .then((response) => {
            console.log(response);
            alert('Password successfully reset');

            this.setState({redirect: true});
        })
        .catch((error) => {
            alert(error.response.data.error);
        });
    }    

    render() {
        let email2 = localStorage.getItem('email');
        if (email2) {
            this.setState({redirect: true});
        }
        if (this.state.redirect === true) {

            return <Redirect exact from="/recp" push to={{
                pathname: "/lp",
                state: { type: this.state.type }
            }}/>;
        }
        return (
           
            <div>
                
                <Footer />
                <TopBar/>
                
                <head>
                   <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
                   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                   <meta name="HandheldFriendly" content="true" />
                </head>
                <div className="LoginPage">
                
                    
                    
                        <div class="grid-container1" >
                        <div class="grid-item1">
                            <img 
                                className="LoginLogo"
                                src={logo}
                                alt="logo" /> 
                            <br />
                        </div>
                        <div class="grid-item2">
                            <img 
                                className="LogoName2"
                                src={logoName}
                                alt="logoName"/>
                        </div>
                        </div>
                    
                        <div className="gridcontainerfinal5" >
                        <h1 className="RecoverPasswordText">Recover Password</h1>
                        <div class="grid-containerRecover" >
                            <div class="grid-item">
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Email"
                                    variant="filled"
                                    name = "email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                     />
                            </div>
                            <br />
                            <div class="grid-item">
                                <TextField
                                    id="filled-password-input"
                                    label="New-Password"
                                    name = "newpassword"
                                    value={this.state.repeat}
                                    onChange={this.handleRepeatChange}
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled" 
                                     />
                            </div>
                            <br />
                            <div class="grid-item">
                                <TextField
                                  id="filled-password-input"
                                  label="Confirm-New-Password"
                                  name = "confirmnewpassword"
                                  value={this.state.newpassword}
                                  onChange={this.handleNewPasswordChange}
                                  type="password"
                                  autoComplete="current-password"
                                  variant="filled" 
                                   />
                            </div>
                            <br />
                            <div class="grid-item">
                            <form onSubmit={this.onSubmit}>
                                <ThemeProvider theme={theme}>
                                <Button 
                                    className  = "Done" 
                                    variant = "contained"
                                    color = "primary" 
                                    type = "submit"
                                    >
                                    Done
                                </Button> 
                                </ThemeProvider>
                            </form>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            
        );
    }
}
