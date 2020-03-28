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

import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';
import logo from '../../images/image1.png';
import logoName from '../../images/ImageName.png';
import './ChangePassword.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
const axios = require('axios');

const theme = createMuiTheme ({
    palette: {
        primary: {
            main:'#F2B705',
        }
    }
});

export default class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
           email : '',
           oldpassword : '',
           newpassword: '',
          redirect: false,
        };

        this.handleEmailChange = this.handleChange.bind(this, 'email');
        this.handleOldPasswordChange = this.handleChange.bind(this, 'oldpassword');
        this.handleNewPasswordChange = this.handleChange.bind(this, 'newpassword');
    }

    handleChange(keyName, e) {
        this.setState({ [keyName]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        // Check if email is current user's email
        // Validate current user
        if (this.state.email !== localStorage.getItem("email")) {
            alert('Incorrect email');
            return;
        }

        // Check password format
        if (this.state.newpassword.length < 8 || !this.state.newpassword.match(/[0-9]/g)) {
            alert('New password format not correct');
            return;
        }

        // Check if old password and new password matches
        if (this.state.oldpassword === this.state.newpassword) {
            alert('Cannot change to the same password!');
            return;
        }

        axios({
            method: 'post',
            url: 'https://unidiscourse-backend.herokuapp.com/api-user/changepass',
            data: {
                email: this.state.email,
                oldpassword: this.state.oldpassword,
                newpassword: this.state.newpassword,
            }
        })
        .then((response) => {
            console.log(response);
            alert('Password successfully changed');

            this.setState({redirect: true});
        })
        .catch((error) => {
            
            console.error(error.response);

            // Check user
            if (error.response.data.error === "User not found") {
                alert('User does not exist');
            }

            // Catch invalid old password
            if (error.response.data.error === "Incorrect password") {
                alert('Invalid old password entered');
            }

        });
    }

    render() {

        if (this.state.redirect === true) {
            
            // Clear local storage
            localStorage.removeItem("email");
            localStorage.removeItem("username");
    
            return <Redirect exact from="/changepassword" push to={{
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
                    <div className="gridcontainerfinal4">
                    <h1 className="ChangePasswordText">Change Password</h1>
                    <div class="grid-containerChange" >
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
                                    label="Old-Password"
                                    name = "oldpassword"
                                    value={this.state.oldpassword}
                                    onChange={this.handleOldPasswordChange}
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled" 
                                    />
                        </div>
                        <br />
                        <div class="grid-item">
                            <TextField
                                id="filled-password-input"
                                label="New-Password"
                                name = "newpassword"
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
