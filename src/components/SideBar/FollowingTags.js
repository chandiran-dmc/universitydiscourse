/**
 * This is a react component for showing following tags
 * This is the component on the right of the posts in the main feed page
 */

import React, { Component } from 'react';
import { Grid, IconButton, createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
import axios from 'axios';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2B705"
        },
        secondary: {
            main: "#757575"
        }
    }
});


export default class FollowingTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: props.tags
        };
    }

    handleRemoveTag = (tagName) => {

        if (window.confirm('Remove tag ' + tagName + ' ?')) {

            // cannot remove default tag manually
            if (tagName === "default") {
                alert('Cannot remove default tag');
                return;
            }

            let tags = localStorage.getItem("tags").split(",");
            // remove the tag from the local storage
            tags = tags.filter((value, index, arr) => {return value !== tagName});
            if (tags.length === 0) {
                localStorage.removeItem("tags");
            }
            else {
                // update the local storage
                localStorage.setItem("tags", tags.toString());
            }

            // update database
            axios({
                method: 'post',
                url: 'http://localhost:3000/api-user/updateusertags',
                data: {
                    email: localStorage.getItem("email"),
                    newtags: (tags.length === 0 ? "default" : tags.toString())
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
    }

    renderTags = () => {
        // react component of tags
        let tags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            tags[i] = (
                <Grid item key={i}>
                    <Grid 
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center" >
                        <Grid item >
                            <Typography variant="button">
                            <h3 style={{ color: '#023373' }}>{this.state.tags[i]}</h3>
                            </Typography>
                        </Grid>
                        <Grid item >
                            <IconButton 
                                type="button"
                                onClick={() => {this.handleRemoveTag(this.state.tags[i])}} >
                                <RemoveCircleOutlineIcon color="primary"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        return tags;
    }

    // componentDidMount() {
    //     setInterval(this.renderTags(), 1000);
    // }


    render() {

        return (
            <ThemeProvider theme={theme} >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end" >
                    {this.renderTags()}
                </Grid>
            </ThemeProvider>
        )
    }
}