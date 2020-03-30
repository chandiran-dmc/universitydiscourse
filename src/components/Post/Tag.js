/**
 * This is a react component for tag that will only be on for posts
 */

import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import axios from 'axios';

export default class Tag extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            open: false
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
    }

    toggleOpen = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
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
                onClose={this.toggleOpen}
                >
                    <DialogTitle>
                        Hello
                    </DialogTitle>
                    <DialogActions>
                        <Button>
                            hi
                        </Button>
                        <Button>
                            bye
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    
}
