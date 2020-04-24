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
import {Grid} from '@material-ui/core'
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
export default class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
          email : '',
          password: '',
          redirect1: false,
          redirect2: false,
          formErrors: {email: '', password: ''},
          emailValid: false,
          passwordValid: false,
          formValid: false
        };
        this.handleEmailChange = this.handleChange.bind(this, 'email');
        this.handlePasswordChange = this.handleChange.bind(this, 'password');
    }

      

    handleChange(keyName, e) {
        this.setState({ [keyName]: e.target.value });
    }

    onSubmit1 = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/authenticate',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .then((response) => {
            console.log(response);
            localStorage.setItem('email', this.state.email);
            this.setState({redirect1: true});
        })
        .catch((error) => {
            // console.error(error.response.data.error);
            // alert(error.response.data.error);
        });
        
    }    

    onSubmit2 = (event) => {
        this.setState({redirect2: true});
    }

    onClickCreate() {
        alert('hi');
    }

    render() {
        let email2 = localStorage.getItem('email');
        if (email2) {
            this.setState({redirect1: true});
        }
        if (this.state.redirect1 === true) {
    
            return <Redirect exact from="/lp" push to={{
                pathname: "/mp",
                state: { type: this.state.type }
            }}/>;
        }
        if (this.state.redirect2 === true) {
            return <Redirect exact from="/lp" push to={{
                pathname: "/sendlink",
            }}/>;
        }

        return (
            <div>
                <TopBar/>
                {/* <div className="LoginPage">
                
                    
                    
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
                    
                    <div class ="gridcontainerfinal">
                        <h1 className="LoginText">Login</h1>
                        <div class="grid-container2" >
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
                                    required
                                    id="filled-password-input"
                                    label="Password"
                                    name = "Password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled" />
                            </div>
                            <br />
                            <div class="grid-item">
                            <form onSubmit={this.onSubmit1}>
                                <ThemeProvider theme={theme}>
                                <Button 
                                    className  = "LOGINButtonTwo" 
                                    variant = "contained"
                                    color = "primary" 
                                    type = "submit"
                                    >
                                    Log In
                                </Button> 
                                </ThemeProvider>
                            </form>
                            </div>
                            <br />
                            <div class="grid-item">
                            <form onSubmit={this.onSubmit2}>
                                <ThemeProvider theme={theme}>
                                <Button 
                                    className  = "LOGINButtonTwo" 
                                    variant = "contained"
                                    color = "primary" 
                                    type = "submit"
                                    >
                                    RESET PASSWORD
                                </Button> 
                                </ThemeProvider>
                            </form>
                            </div>
                        </div>
                        </div>
                </div> */}

            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                spacing={1}>
                <Grid item>
                    <br />
                    <img 
                    width = {200}
                    src={logo}
                    alt="logo" />
                </Grid>
                <Grid item>
                    <h2 style={{ color: '#023373' }}>Login</h2>
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="filled-required"
                        label="Email"
                        variant="filled"
                        name = "email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                            />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="filled-password-input"
                        label="Password"
                        name = "Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        type="password"
                        autoComplete="current-password"
                        variant="filled" />
                </Grid>
                <Grid item>
                    <br />
                    <form onSubmit={this.onSubmit1}>
                        <ThemeProvider theme={theme}>
                        <Button 
                            className  = "LOGINButtonTwo" 
                            variant = "contained"
                            color = "primary" 
                            type = "submit"
                            >
                            Log In
                        </Button> 
                        </ThemeProvider>
                    </form>
                </Grid>
                <Grid item>
                    <br />
                    <form onSubmit={this.onSubmit2}>
                        <ThemeProvider theme={theme}>
                        <Button 
                            className  = "LOGINButtonTwo" 
                            variant = "contained"
                            color = "primary" 
                            type = "submit"
                            >
                            RESET PASSWORD
                        </Button> 
                        </ThemeProvider>
                    </form>
                </Grid>                
            </Grid>
            </div>
        );
    }
}
