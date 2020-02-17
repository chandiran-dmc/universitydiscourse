/**
 * This is a react component for the footer which consists of
 * - the logo, with the name
 * - the objective
 * - explore links
 * - contact information
 * 
 * Please look at the UI mockup for image explanation
 */

import React, { Component } from 'react'
import './Footer.css';
import logo from '../../images/image1.png';
import logoName from '../../images/ImageName.png';

export default class Footer extends Component {

     render() {
        return (
            <div className="Footer">
                <img 
                        className="Logo"
                        src={logo}
                        alt="logo"
                />
                <img 
                        className="LogoName"
                        src={logoName}
                        alt="logoName"
                />
                <div
                       className="lowerFooter"
                />
                <p className="Info">
                    University discourse intends to assists students
                </p>
                <p className="Info2">
                    in finding solutions to their academic concerns 
                </p>
                <p className="Info4">
                    Contact 
                </p>
                <p className="Info3">
                    Explore Links 
                </p>
                
                        
                
            </div>
        )
    }

}
