/**
 * This is a react component for tag that will only be on for posts
 */

import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Tag extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            open: false,
            toCoursePage: false
        };
    }

    followTag = (tag) => {
        let tags = [];
        if (localStorage.getItem("tags") != null) {
            tags = localStorage.getItem("tags").split(",");
            // Remove default tag
            tags = tags.filter((value, index, arr) => {return value !== "default"});
        }
        // update local storage
        // handling duplicate tags
        if (tags.includes(tag)) {
            alert(`Tag ${tag} is already being followed.`);
            // Close dialog
            this.closeDialog();
            return;
        } else {
            tags.push(tag);
        }
        localStorage.setItem("tags", tags.toString());

        // update database
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/updateusertags',
            data: {
                email: localStorage.getItem("email"),
                newtags: tags.toString()
            }
        })
        .then((response) => {
            console.log("Tags updated");
        })
        .catch((error) => {
            console.error(error.response);
            if (error.response.data.message) {
                alert(error.response.data.message);
            }
        });

        // Close dialog
        this.closeDialog();
    }

    toggleOpen = () => {
        this.setState({
            open: !this.state.open
        });
    }

    closeDialog = () => {
        this.setState({
            open: false
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
                    onClick={this.toggleOpen}
                    disableElevation
                    size="small" >
                    #{this.state.name}
                </Button>
                <Dialog
                open={this.state.open}
                onClose={this.closeDialog}
                >
                    <DialogTitle>
                        Tag Menu
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth
                            onClick={() => {this.followTag(this.state.name)}}
                        >
                            Follow {this.state.name}
                        </Button>
                    </DialogActions>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth
                            onClick={() => {this.setState({toCoursePage: true})}}
                        >
                            Go to course page
                        </Button>
                    </DialogActions>
                    {this.state.graph}
                </Dialog>
            </div>
        );
    }
    
}
