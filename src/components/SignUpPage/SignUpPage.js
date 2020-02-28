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
import './SignUpPage.css'

export default class SignUpPage extends Component {

    onClickCreate() {
        alert('hi');
    }

    render() {
        return (
            <div>
                <TopBar />
                <Footer />
                <div className="LoginPage">
                <form>
                <div className="Form">
                <img 
                        className="LoginLogo"
                        src={logo}
                        alt="logo"
                    />
                <h1 className="LoginText">SignUp</h1>
                    <input type="text"
                    placeholder = "Choose a username"/>
                    <br />
                    <input type="text"
                    placeholder = "Password"/>
                    <br />
                    <input 
                        className="SIGNUPButton"
                        type="submit" 
                        value="SIGN UP" 
                    />
                </div>
                </form>
                

                    
                </div>
            </div>
        )
    }
}
