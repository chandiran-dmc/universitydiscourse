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
import './ChangeEmail.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {Grid} from '@material-ui/core'

const axios = require('axios');

const theme = createMuiTheme({
    palette: {
      background: {
        default: "#00305A",
      },
      primary: {
        main: "#F2B705",
      },
      secondary: {
        main: "#F2C94C",
      },
      post_primary: {
        main: "#F2F2F2",
      },
      post_secondary: {
        main: "#757575",
      },
      text: {
        main: "#000000",
        sub: "#9B9B9B",
      },
    },
  });

export default class ChangeEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
           oldemail : '',
           newemail: '',
          redirect: false,
        };

        this.handleOldEmailChange = this.handleChange.bind(this, 'oldemail');
        this.handleNewEmailChange = this.handleChange.bind(this, 'newemail');
    }

    handleChange(keyName, e) {
        this.setState({ [keyName]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        // Validate current user
        if (this.state.oldemail !== localStorage.getItem("email")) {
            alert('Incorrect email');
            return;
        }

        // Check for same input
        if (this.state.oldemail === this.state.newemail) {
            alert('Emails are the same!');
            return;
        }

        // Check email format
        if (!this.state.newemail.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+/g)) {
            alert('Email format not correct');
            return;
        }

        axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/changeemail',
            data: {
                email: this.state.oldemail,
                newemail: this.state.newemail
            }
        })
        .then((response) => {
            console.log(response);
            alert('Email successfully changed');

            this.setState({redirect: true});
        })
        .catch((error) => {

            console.error(error.response);

            // Check user
            if (error.response.data.error === "User not found") {
                alert('User does not exist');
            }

            // Check duplicate email
            if (error.response.data.message === "Email not updated!") {
                alert('New email is already registered');
            }
        });
    }

    render() {

        if (this.state.redirect === true) {
            
            // Clear local storage
            localStorage.removeItem("email");
          //  localStorage.removeItem("username");
    
            return <Redirect exact from="/changeemail" push to={{
                pathname: "/lp",
                state: { type: this.state.type }
            }}/>;
        }

        return (

            <ThemeProvider theme={theme}>
        
          <div>
              <TopBar />
                {/* <TopBar/>
                
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
                    <div className="gridcontainerfinal3">
                    <h1 className="ChangeEmailText">Change Email</h1>
                    <div class="grid-containerChange" >
                        <div class="grid-item">
                            <TextField
                                required
                                id="filled-required"
                                data-testid="Old-email"
                                label="Old-email"
                                variant="filled"
                                name = "email"
                                value={this.state.oldemail}
                                onChange={this.handleOldEmailChange}
                                    />
                        </div>
                        <br />
                        <div class="grid-item">
                            <TextField
                                required
                                id="filled-required"
                                data-testid="New-email"
                                label="New-email"
                                variant="filled"
                                name = "email"
                                value={this.state.newemail}
                                onChange={this.handleNewEmailChange} 
                                />
                        </div>
                        <br />
                        <div class="grid-item">
                        <form onSubmit={this.onSubmit}>
                            <ThemeProvider theme={theme}>
                            <Button 
                                data-testid="Done-button"
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
                    <h2 style={{ color: '#023373' }}>Change Email</h2>
                </Grid>
                <Grid item>
                <TextField
                                required
                                id="filled-required"
                                data-testid="Old-email"
                                label="Old-email"
                                variant="filled"
                                name = "email"
                                value={this.state.oldemail}
                                onChange={this.handleOldEmailChange}
                                    />
                </Grid>
                <Grid item>
                <TextField
                                required
                                id="filled-required"
                                data-testid="New-email"
                                label="New-email"
                                variant="filled"
                                name = "email"
                                value={this.state.newemail}
                                onChange={this.handleNewEmailChange} 
                                />

                </Grid>
                <Grid item>
                <form onSubmit={this.onSubmit}>
                            <ThemeProvider theme={theme}>
                            <Button 
                                data-testid="Done-button"
                                className  = "Done" 
                                variant = "contained"
                                color = "primary" 
                                type = "submit"
                                >
                                Done
                            </Button> 
                            </ThemeProvider>
                        </form>
                </Grid>
            </Grid>


            </div>
            </ThemeProvider>
        );
    }
}
