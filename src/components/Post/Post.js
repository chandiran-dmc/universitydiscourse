/**
 * This is a react component for post
 * 
 * This component should consist of:
 * - title (String): title of the post
 * - content (String) : text or url 
 * - user (String) : author of the post
 * - time (Date)   : upload time
 * - tags (Tag[])  : tags
 * - comments      : comment thread
 * - type          : type of the post (text, image, calendar, link, document)
 * - count         : upvote downvote total
 */


import React, { Component } from 'react'
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton, TextField } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
import LikeIcon from '../../customeIcons/likeIcon';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.data.title,
            content: props.data.content,
            user: props.data.user,
            time: props.data.time,
            tags: props.data.tag,
            comments: props.data.comments,
            type: props.data.type,
            count: props.data.count,
            theme: props.theme,
            isEditPost: false,
            mode: "",
            makeacomment: false,
            seeallcomments: false,
            comments: []
        };       
    }

    createComment = () => {
        //event.preventDefault();
        console.log(this.state.title);
        this.setState(
            {
                makeacomment: true
            }
        );
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-comment/comment',
            data: {
                count: 0,
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }

    getComments = async () => {

        // TODO: request the database for the comments
        let comments = []

        // Send request to the database
        axios({
                method: 'get',
                url: 'http://localhost:3000/api-comment/getcomments'
        })
        .then((response) => {
                comments = response.data.data;
                
                this.setState({
                    comments: comments
                });
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }
    

    handleRedirect = (editPost) => {
        console.log(this.state.title)
        if(this.state.user === localStorage.getItem("username")) {

            this.setState({
                mode: editPost,
                isEditPost: true,
            });

        }
        else {
            alert('You can not edit this post');
        }
    }

    renderContent = () => {

        let content = <p>error</p>;

        switch (this.state.type) {
            case "text":
                content = <Typography variant="h6">{this.state.content}</Typography>;
                break;
        
            case "image":
                content = <img src={this.state.content} alt={"The Image URL is invalid"} width="600"/>
                break;

            default:
                break;
        }

        return content;
    }


    render() {
        if (this.state.isEditPost === true) {

            return <Redirect exact from="/" push to={{
                pathname: "/editpost",
                state: { 
                    title: this.state.title,
                    content: this.state.content,
                    user: this.state.user,
                    time: this.state.time,
                    tags: this.state.tags,
                    comments: this.state.comments,
                    type: this.state.type,
                    count: this.state.count,
                    mode: this.state.mode
                }
            }}/>;
        }

        return (
            <ThemeProvider theme={this.state.theme} >     
                <Box
                    boxShadow={2}
                    margin={1}
                    padding={2}
                    bgcolor="post_primary.main" >
                    
                    <Grid container 
                        wrap="nowrap" 
                        direction="row"
                        spacing={2}>
                        <Grid item>
                            <Avatar>{this.state.user}</Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Grid item>
                                <Typography 
                                    variant="body1"
                                    color="textPrimary" >
                                    {this.state.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant="caption"
                                    color="textSecondary" >
                                    {new Date(this.state.time).toTimeString()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton 
                                type="button"
                                onClick={() => this.handleRedirect("edit post")} >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        wrap="nowrap" 
                        spacing={2}
                        direction="column">
                        <Grid item>
                            {this.renderContent()}
                        </Grid>
                        <Grid 
                            container
                            wrap="nowrap"
                            justify="flex-start"
                            alignItems="center"
                            direction="row">
                            <Grid 
                                container
                                wrap="nowrap"
                                spacing={0}
                                justify="flex-start"
                                alignItems="center"
                                direction="row">
                                <Grid item>
                                    <IconButton 
                                        type="button"
                                        onClick={() => {alert('Like?')}} >
                                        <LikeIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        {this.state.count}
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Button
                                        variant="contained" onClick={() => this.setState({makeacomment: !this.state.makeacomment})}>
                                        {"Make a comment"}
                                    </Button>
                                </Grid>
                                <Grid item >
                                    <Button
                                        variant="contained" onClick={() => this.setState({seeallcomments: !this.state.seeallcomments})}>
                                        {"See all comments"}
                                    </Button>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid>
                            <Typography variant="inherit">
                                #{this.state.tags.toString()}
                            </Typography>
                        </Grid>
                        <Grid 
                            container
                            wrap="nowrap"
                            justify="flex-start"
                            alignItems="center"
                            direction="row">
                            
                            
                            {(this.state.makeacomment == true)?                                
                                    <TextField id="filled-basic" label="Make a comment" variant="filled" onChange={this.handleChangeContent}/>:""
                                
                            }
                            {(this.state.seeallcomments == true)?                                
                                <Grid item>
                                {this.state.commentlist === null ? <p>Fetching Comments</p> : this.state.comments}
                            </Grid>:""                                
                            }
                                               
                            
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        )
    }
}
