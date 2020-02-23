// Sample for redirection

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default class Sandbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "temp"
        };
    }

    // This function will change the state 'value'
    handleRedirect = (customValue) => {
        this.setState({
            value: customValue
        });
    }

    render() {

        // Whenever a state has been modified, the component will re-render
        if (this.state.value !== "temp") {

            let referral = {
                pathname: "/",
                state: this.state.value
            };

            return <Redirect to={referral} />
        }

        return (
            <div>
                <Button
                    onClick={() => this.handleRedirect("hello world")} >
                    Click on me to go back to home
                </Button>
            </div>
        )
    }
}
