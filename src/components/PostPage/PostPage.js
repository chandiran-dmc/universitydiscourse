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
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
import LikeIcon from '../../customeIcons/likeIcon';
import {FacebookShareButton} from "react-share"
import FacebookIcon from '@material-ui/icons/Facebook';
const axios = require('axios');



export default class PostPage extends Component {

    constructor(props) {
        super(props);
        var location = window.location.href;
        var result = location.substring(location.lastIndexOf("/") + 1);
        var pos = result.indexOf('?');
        if ( pos < 0 ) pos = result.length;
        result = result.substring(0, pos);
        this.state = {
            id: result,
            type: "",
            mode: "",
            title: "",
            content: "",
            tags: [],
            user: "",
            time: "",
            comments: [],
            count: 0,
            user: "",
           
        };

        console.log(this.state.id)


        axios({
            method: 'get',
            url: "https://unidiscourse-backend.herokuapp.com/api/getPostByID",
            params: {
                id: this.state.id,
                
            }
           
        })
        .then((response) => {
            this.setState({
                title: response.data.data.title,
                type: response.data.data.type,
                tags: response.data.data.tag,
                count: response.data.data.count,
                comments: response.data.data.comments,
                content: response.data.data.content,
                time: response.data.data.time,
                user: response.data.data.user,

            })
               

                console.log(response);
        })
        .catch((error) => {

                console.log(error);
        });

       

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

    renderComments = () => {

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
        const iframe = <iframe src={`universitydiscourse.herokuapp.com/post/${this.state.id}`} width="540" height="450"/>

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
                                    color="textPrimary" 
                                    >
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
                            </Grid>
                            <Grid item >
                                <FacebookShareButton url={iframe.props.src} quote={`universitydiscourse.herokuapp.com/post/${this.state.id}`}>
                                   <FacebookIcon />
                                </FacebookShareButton>
                                <Button
                                    variant="contained"
                                    onClick={() => this.renderComments} >
                                    {this.state.comments.length <= 1 ? this.state.comments.length + " comment" : this.state.comments.length + " comments"}
                                    
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography variant="inherit">
                                #{this.state.tags.toString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        )
    }
 }


