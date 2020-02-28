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
import { Button, Box, Grid, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
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
            type: this.props.location.state.type,
            mode: this.props.location.state.mode,
            title: (this.props.location.state.title === undefined ? "" : this.props.location.state.title),
            content: (this.props.location.state.content === undefined ? "" : this.props.location.state.content),
            tags: (this.props.location.state.tags === undefined ? [] : this.props.location.state.tags),
            user: this.props.location.state.user,
            time: this.props.location.state.time,
            comments: this.props.location.state.comments,
            count: this.props.location.state.count,
            isRedirect: false
        };

        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.handleUpdatePost = this.handleUpdatePost.bind(this);
    }
    
    handleChangeContent(event) {
        this.setState(
            {
                type: this.state.type,
                title: this.state.title,
                content: event.target.value,
                tags: this.state.tags
            }
        );
    }

    handleChangeTags(event) {
        this.setState(
            {
                type:this.state.type,
                title: this.state.title,
                content: this.state.content,
                tags: event.target.value.replace(" ", "").split(",")
            }
        );
    }

    handleCreatePost(event) {
        // This is to stop the default behavior, 
        // which in this case is stopping form from reloading itself
        event.preventDefault();

        // Check if input is empty
        if (this.state.tags.length === 0) {
            alert('Tags cannot be empty');
            return;
        } else if (this.state.title.length === 0 ) {
            alert('Title cannot be empty');
            return;
        } else if (this.state.content.length === 0) {
            alert('Content cannot be empty');
            return;
        }

        let username = localStorage.getItem("username");
        if (!username) {
            username = "johndoe";
        }

        // Send request to the database
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/createpost',
            data: {
                title: this.state.title,
                user: username,
                type: this.state.type,
                tag: this.state.tags,
                count: 0,
                comments: [],
                content: this.state.content,
                time: new Date().getTime()
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({
                type: this.state.type,
                title: this.state.title,
                content: this.state.content,
                tags: this.state.tags,
                isRedirect: true
            });
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }

    handleChangeTitle(event) {
        this.setState(
            {
                type: this.state.type,
                title: event.target.value,
                content: this.state.content,
                tags: this.state.tags
            }
        );
    }

    handleUpdatePost(event) {
        // This is to stop the default behavior, 
        // which in this case is stopping form from reloading itself
        event.preventDefault();

        // Check if input is empty
        if (this.state.tags.length === 0) {
            alert('Tags cannot be empty');
            return;
        } else if (this.state.title.length === 0 ) {
            alert('Title cannot be empty');
            return;
        } else if (this.state.content.length === 0) {
            alert('Content cannot be empty');
            return;
        }
        
        let username = localStorage.getItem("username");
        if (!username) {
            username = "johndoe";
        }

        // Send request to the database
        axios({
            method: 'put',
            url: 'http://localhost:3000/api/updatepost',
            data: {
                title: this.state.title,
                user: username,
                type: this.state.type,
                tag: this.state.tags,
                count: 0,
                comments: [],
                content: this.state.content,
                time: this.state.time
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({
                type: this.state.type,
                title: this.state.title,
                content: this.state.content,
                tags: this.state.tags,
                isRedirect: true
            });
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }

    getTextPage = () => {
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
                                boxShadow={0}
                                margin={1}
                                width="50%"
                                mt={20} >
                                <ThemeProvider theme={theme}>
                                    <h3 style={{ color: '#023373' }}>
                                        Post Title
                                    </h3>
                                    <br/>
                                    <TextField id="filled-basic" label="Post Title" variant="filled" size="medium" onChange={this.handleChangeTitle} defaultValue={this.state.title}/>
                                    <br />
                                    <h3 style={{ color: '#023373' }}>
                                        Post Content
                                    </h3>
                                    <br />
                                    <TextField id="filled-basic" label="Post Content" variant="filled" onChange={this.handleChangeContent} defaultValue={this.state.content}/>
                                    <br />
                                    <h3 style={{ color: '#023373' }}>
                                        Tags
                                    </h3>
                                    <br />
                                    <TextField id="filled-basic" label="Tags" variant="filled" onChange={this.handleChangeTags} defaultValue={this.state.tags.toString()} />
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
                                                onClick={this.state.mode === "edit post" ? this.handleUpdatePost : this.handleCreatePost} >
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

    getImagePage = () => {
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
                                    <TextField id="filled-basic" label="Post Title" variant="filled" size="medium" onChange={this.handleChangeTitle}  defaultValue={this.state.title}/>
                                    <br />
                                    <h3 style={{ color: '#023373' }}>
                                        Post Image URL
                                    </h3>
                                    <br />
                                    <TextField id="filled-basic" label="Post Image URL" variant="filled" onChange={this.handleChangeContent}  defaultValue={this.state.content}/>
                                    <br />
                                    <h3 style={{ color: '#023373' }}>
                                        Tags
                                    </h3>
                                    <br />
                                    <TextField id="filled-basic" label="Tags" variant="filled" onChange={this.handleChangeTags}/>
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
                                                onClick={this.state.mode === "edit post" ? this.handleUpdatePost : this.handleCreatePost} >
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
   

    render() {

        if (this.state.isRedirect) {
            return <Redirect exact from="/createpost" push to={{
                pathname: "/"
            }}/>;
        }

        if (this.state.type === "text") {
            return this.getTextPage();
        }

        if (this.state.type === "image") {
            return this.getImagePage();
        }
    }
}
