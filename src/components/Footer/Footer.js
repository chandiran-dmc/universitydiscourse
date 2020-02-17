/**
 * This is a react component for the top bar which consists of
 * - a search field
 * - a search button
 * - a profile image button (depending user state)
 * - logo button
 * 
 * Please look at the UI mockup for image explanation
 */

import React, { Component } from 'react'
import './Footer.css';
import logo from '../../images/image1.png';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        // Binding is required so that the function can access the context
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // save the value of input whenever a user enters sth
    handleChange(event) {
        this.setState(
            {
                value: event.target.value
            }
        );
    }

    // user clicked on search
    // TODO: route to search page
    handleSearch(event) {
        // This is to stop the default behavior, 
        // which in this case is stopping form from reloading itself
        event.preventDefault();
        alert('Searching for ' + this.state.value);
    }

    // The input form value is controlled by react = controlled components
    render() {
        return (
            <div className="Footer">
                <form 
                    onSubmit={this.handleSearch}>
                    <img 
                        className="Logo"
                        src={logo}
                        alt="logo"
                    />
                </form>
            </div>
        )
    }
}
