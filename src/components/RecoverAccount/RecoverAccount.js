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
import './RecoverAccount.css'

export default class RegisterPage extends Component {

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
                <h1 className="LoginText">Recover Your Account</h1>
                    <input type="text"
                    placeholder="the_jane@gmail.com"/>
                    <br />
                    <input 
                        className="EMAILMEButton"
                        type="submit" 
                        value="EMAIL" 
                    />
                </div>
                </form>
                

                    
                </div>
            </div>
        )
    }
}
