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
          redirect: false,
        };
        this.handleEmailChange = this.handleChange.bind(this, 'email');
        this.handleNewPasswordChange = this.handleChange.bind(this, 'newpassword');    
    }

    
    handleChange(keyName, e) {
        this.setState({ [keyName]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        alert('Change coming soon!');
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/recoverpassword',
            data: {
                email: this.state.email,
                newpassword: this.state.newpassword,
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
        this.setState({redirect: true});
    }    

    // onClickCreate() {
    //     alert('hi');
    // }

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
                                    //  value={this.state.oldpassword}
                                    //  onChange={this.handleOldPasswordChange}
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
            
        );
    }
}
