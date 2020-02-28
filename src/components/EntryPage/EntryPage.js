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
import './EntryPage.css'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom';
import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'

const theme = createMuiTheme ({
    palette: {
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
            // <form onSubmit={this.onSubmit1}>
            <div>
                
                <Footer />
                <TopBar/>
                
                <head>
                   <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
                   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                   <meta name="HandheldFriendly" content="true" />
                </head>
                <div className="EntryPage">
                    <div class="grid-container" >
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
            </div>
        );
    }
}
