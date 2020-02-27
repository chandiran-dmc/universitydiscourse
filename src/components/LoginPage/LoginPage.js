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
import './LoginPage.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'

const theme = createMuiTheme ({
    palette: {
        primary: {
            main:'#F2B705',
        }
    }

});
export default class LoginPage extends Component {

    

    onClickCreate() {
        alert('hi');
    }

    render() {
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
                    
                        <h1 className="LoginText">Login</h1>
                        <div class="grid-container2" >
                            <div class="grid-item">
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Username"
                                    variant="filled" />
                            </div>
                            <br />
                            <div class="grid-item">
                                <TextField
                                    required
                                    id="filled-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled" />
                            </div>
                            <br />
                            <div class="grid-item">
                                <ThemeProvider theme={theme}>
                                <Button 
                                    className  = "LOGINButton" 
                                    variant = "contained"
                                    color = "primary" >
                                    Log In
                                </Button> 
                                </ThemeProvider>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}
