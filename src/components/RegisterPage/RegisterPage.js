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

const theme = createMuiTheme ({
    palette: {
        primary: {
            main:'#F2B705',
        }
    }

});

export default class RegisterPage extends Component {

    onClickCreate() {
        alert('hi');
    }

    render() {
        return (
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
                                    variant="filled" />
                            </div>
                            <br />
                            
                            <div class="grid-item">
                                <ThemeProvider theme={theme}>
                                <Button 
                                    className  = "NEXT" 
                                    variant = "contained"
                                    color = "primary" >
                                    NEXT
                                </Button> 
                                </ThemeProvider>
                            </div>
                        </div>
            </div>
            
        )
    }
}
