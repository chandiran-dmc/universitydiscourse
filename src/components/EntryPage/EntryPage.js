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
import '../LoginPage/LoginPage.css'
import Button from '@material-ui/core/Button';
import {Grid, CssBaseline, Typography} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'

const theme = createMuiTheme ({
    palette: {
        background: {
            default: "#00305A"
        },
        primary: {
            main:'#F2B705',
        }
    }

});
export default class EntryPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
          redirect1: false,
          redirect2: false
        };
    }

    onSubmit1 = (event) => {
        this.setState({redirect1: true});
    }    

    onSubmit2 = (event) => {
        this.setState({redirect2: true});
    } 

    render() {
        if (this.state.redirect1 === true) {
    
            return <Redirect exact from="/" push to={{
                pathname: "/lp",
                
            }}/>;
        }
        if (this.state.redirect2 === true) {
    
            return <Redirect exact from="/" push to={{
                pathname: "/rp",
                
            }}/>;
        }


        return (
            <div>
                <TopBar/>
                
                {/* <Grid container 
                    direction="column"
                    alignItems="center"
                    spacing={2}>
                <div className="EntryPage">
                    <div class="grid-containerEP" >
                    
                    <div class="grid-item2">
                        <img 
                            className="LogoName2"
                            src={logoName}
                            alt="logoName"/>
                    </div>
                    </div>
                    <div class="grid-containerButtons" >
                        <div class="grid-item">
                        <form onSubmit={this.onSubmit1}>
                            <ThemeProvider theme={theme}>
                            <Button 
                                className  = "LOGINButton" 
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
                                className  = "RegisterButton" 
                                variant = "contained"
                                color = "primary" 
                                type = "submit"
                                >
                                Register
                            </Button> 
                            </ThemeProvider>
                            </form>
                        </div>
                    </div>
                </div>
                </Grid> */}
                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={1}>
                    <Grid item>
                        <br />
                        <img 
                            // className="LoginLogo"
                            width={200}
                            src={logo}
                            alt="logo" /> 
                        <br />
                    </Grid>
                    {/* <Grid item>
                        <img 
                            // className="LogoName2"
                            width={400}
                            src={logoName}
                            alt="logoName"/>
                    </Grid> */}
                    <Grid item>
                        <br />
                        <br />
                        <form onSubmit={this.onSubmit1}>
                            <ThemeProvider theme={theme}>
                            <Button 
                                className  = "LOGINButtonTwo" 
                                variant = "contained"
                                color = "primary" 
                                type = "submit"
                                size = "large"
                                >
                                Log In
                            </Button> 
                            </ThemeProvider>
                        </form>
                    </Grid>
                    <Grid item>
                        <br />
                        <br />
                        <form onSubmit={this.onSubmit2}>
                            <ThemeProvider theme={theme}>
                            <Button 
                                className  = "LOGINButtonTwo" 
                                variant = "contained"
                                color = "primary" 
                                type = "submit"
                                size = "large"
                                >
                                Register
                            </Button> 
                            </ThemeProvider>
                            </form>
                    </Grid>
                </Grid>
                <Footer />
            </div>
        );
    }
}
