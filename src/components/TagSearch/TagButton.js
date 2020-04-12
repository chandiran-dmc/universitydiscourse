import React, { Component } from 'react';
import { Button} from '@material-ui/core';
import { Redirect } from 'react-router-dom';

export default class TagButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            toCoursePage: false
        };
    }
    redirectCoursePage = () => {
        this.setState({
            toCoursePage: true
        });
    }

    render() {

        // redirect to course page
        if (this.state.toCoursePage) {
            return <Redirect exact from="/" push to={{
                pathname: "/course/" + this.state.name,
            }}/>;
        }

        return (
            <div>
                <Button
                    color="secondary"
                    variant="contained"
                    type="button"
                    onClick={() => {this.redirectCoursePage()}} >
                    {this.state.name}
                </Button>
                <br />
                <br />
            </div>
        );
    }
}