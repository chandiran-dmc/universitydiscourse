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
import './SendLink.css'
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
export default class SendLink extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email : '',
       
          redirect: false,
        };
         this.handleEmailChange = this.handleChange.bind(this, 'email');
        
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

        axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/recover',
            data: {
                email: this.state.email
            }
        })
        .then((response) => {
            alert('Please check your email inbox for reset link');

            this.setState({redirect: true});
        })
        .catch((error) => {

            // Check if the user exists
            if (error.response.data.error) {
                alert(error.response.data.error);
            }
        });
        
    }    

    // onClickCreate() {
    //     alert('hi');
    // }

    render() {
        if (this.state.redirect === true) {

            console.log("HELLOOOOOOOOO");
            
            
    
            return <Redirect exact from="/sendlink" push to={{
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
                <div className="SendLink">
                
                    
                    
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
                    
                    <div className="gridcontainerfinal2">
                        <h1 className="ChangeEmailText">Enter Email</h1>
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
                            {/* <div class="grid-item">
                                <TextField
                                   required
                                   id="filled-required"
                                   label="New-email"
                                   variant="filled"
                                   name = "email"
                                   value={this.state.newemail}
                                   onChange={this.handleNewEmailChange} 
                                   />
                            </div> */}
                            
                            <div class="grid-item">
                            <form onSubmit={this.onSubmit}>
                                <ThemeProvider theme={theme}>
                                <Button 
                                    className  = "Done" 
                                    variant = "contained"
                                    color = "primary" 
                                    type = "submit"
                                    >
                                    Send Link
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
