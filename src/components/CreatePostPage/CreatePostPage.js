/**
 * This is a page for creating a post
 * The user should arrive to this page only if the user clicked
 * on the 'make a post' button
 * 
 * This page should consist of 
 * - option to choose which type of post the user wants
 * - post title field
 * - post content field
 * - tags field
 * - cancel and submit button
 * 
 * Please look at the UI mockup for image explanation
 */

import React, { Component } from 'react'
import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';
import './CreatePostPage.css'
//import { positions, borderTop, borderBottom,borderLeft, borderRight } from '@material-ui/system';
import { Button, Box, input, Grid, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const axios = require('axios');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2B705"
        },
        secondary: {
            main: "#F2C94C"
        },
        typography: {

            subtitle1: {
                fontSize: 48
            }

        }
    }
});


export default class CreatePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.location.state.postType,
            title: "",
            content: ""
        };

        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }

    handleCreatePost(event) {
        // This is to stop the default behavior, 
        // which in this case is stopping form from reloading itself
        event.preventDefault();

        let username = localStorage.getItem("username");
        if (!username) {
            username = "johndoe"
        }

        // Send request to the database
        axios({
            method: 'post',
            url: 'http://localhost:3000/',
            data: {
                title: this.state.title,
                user: username,
                type: this.state.type,
                tag: [], // TODO: 
                count: 0,
                comments: [],
                content: this.state.content,
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleChangeTitle(event) {
        this.setState(
            {
                type: this.state.type,
                title: event.target.value,
                content: this.state.content
            }
        );
    }

    handleChangeContent(event) {

        this.setState(
            {
                type: this.state.type,
                title: this.state.title,
                content: event.target.value
            }
        );
    }


    render() {

        if (this.state.type === "text") {
            return (
                <div>
                    <TopBar />
                    <Footer />

                    <div className="CreatePostPage">
                        <form
                            onSubmit={this.handleCreatePost}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center" >
                                <Box
                                    boxShadow={30}
                                    margin={1}
                                    width="50%"
                                    mt={20} >
                                    <ThemeProvider theme={theme}>
                                        <h3 style={{ color: '#023373' }}>
                                            Post Title
                                        </h3>
                                        <br/>
                                        <TextField id="filled-basic" label="Post Title" variant="filled" size="medium" onChange={this.handleChangeTitle} />

                                        <br />
                                        <h3 style={{ color: '#023373' }}>
                                            Post Content
                                        </h3>
                                        <br />
                                        <TextField id="filled-basic" label="Post Content" variant="filled" onChange={this.handleChangeContent}/>
                                        <br />
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="center" >
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    style={{ justifyContent: 'center' }}
                                                    disableElevation
                                                    type="button"
                                                    onClick={this.handleCreatePost} >
                                                    MAKE POST
                                                </Button>
                                        </Grid>
                                    </ThemeProvider>
                                </Box>
                            </Grid>
                        </form>
                    </div>
                </div>
            );
        }

        if (this.state.type === "image") {
            return (
                <div>
                    <TopBar />
                    <Footer />


                    <div className="CreatePostPage">
                        <form
                            onSubmit={this.handleSearch}>

                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Box
                                    boxShadow={30}
                                    margin={1}
                                    width="50%"
                                    mt={20}

                                >


                                    <ThemeProvider theme={theme}>
                                        <h3 style={{ color: '#023373' }}>
                                            Post Title
                        </h3>

                                        <p></p>
                                        <TextField id="filled-basic" label="Post Title" variant="filled" size="large">
                                            <input
                                                className="Heading"
                                                type="text"
                                                disableElevation
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
                                        </TextField>




                                        <p></p>
                                        <h3 style={{ color: '#023373' }}>
                                            Post Content
                        </h3>
                                        <p></p>
                                        <TextField id="filled-basic" label="Post Content" variant="filled">

                                            <input
                                                className="TextBox"
                                                type="text"
                                                value={this.state.value}
                                                placeholder="Content..."
                                                onChange={this.handleChange}
                                            />
                                        </TextField>

                                        <p>

                                        </p>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                style={{ justifyContent: 'center' }}
                                                disableElevation
                                                type="button"


                                                onClick={this.handleCreatePost} >
                                                MAKE POST
                    </Button>
                                        </Grid>
                                    </ThemeProvider>
                                </Box>
                            </Grid>



                        </form>


                    </div>


                </div>


            );
        }
    }
}
