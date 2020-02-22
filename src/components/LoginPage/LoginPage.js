/**
 * This is a react component for the log in page which consists of
 * - a search field
 * - a search button
 * - a profile image button (depending user state)
 * - logo button
 * - logo image
 * - log in button
 * - register button
 * - footer
 * Please look at the UI mockup for image explanation
 */

import React, { Component } from 'react'
import './TopBar.css';
import logo from '../../images/image1.png';

export default class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        // Binding is required so that the function can access the context
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }