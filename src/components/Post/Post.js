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


import React, { Component } from 'react';
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
import LikeIcon from '../../customeIcons/likeIcon';
import { Redirect } from 'react-router-dom';
import {FacebookShareButton} from "react-share"
import FacebookIcon from '@material-ui/icons/Facebook';
import Tag from './Tag';
import axios from 'axios';

export default class Post extends Component {


    constructor(props) {
        super(props);

        // button tags
        let tags = [];
        props.data.tag.forEach(tag => {
            tags.push(
                <Tag name={tag} key={Math.random()*100000} />
            );
        });

        this.state = {
            id: props.data._id,
            title: props.data.title,
            content: props.data.content,
            user: props.data.user,
            time: props.data.time,
            tags: tags,
            comments: props.data.comments,
            type: props.data.type,
            count: props.data.count,
            theme: props.theme,
            isEditPost: false,
            isRedirectPost: false,
            mode: "",
            postRedirect: "",
            rawTags: props.data.tag
        };       
        console.log(tags)
    }

    handleRedirect = (editPost) => {
        if(this.state.user === localStorage.getItem("username")) {

            this.setState({
                mode: editPost,
                isEditPost: true
            });

        }
        else {
            alert('You can not edit this post');
        }
    }

    handleRedirectPost = (Post) => {
        

        this.setState({
            postRedirect: Post,
            isRedirectPost: true
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


    render() {
        console.log(this.state.tags.toString)
         var url = `universitydiscourse.herokuapp.com/post/${this.state.id}`
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
        if (this.state.isRedirectPost === true) {
            console.log(this.state.id);

            return <Redirect exact from="/" push to={{
                pathname: "/post/" + `${this.state.id}`,
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
                            <Button 
                                    variant="body1"
                                    color="textPrimary" 
                                    onClick={() => this.handleRedirectPost("Post Redirect")} >
                                    {this.state.title}
                                </Button>
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
                            </Grid>
                            <Grid item >
                                <FacebookShareButton url={url} quote={this.state.title} hashtag= {"#" + this.state.rawTags}>
                                   <FacebookIcon />
                                   <meta property = "og:title" content={this.state.title} />
                                </FacebookShareButton>
                                <Button
                                    variant="contained">
                                    {this.state.comments.length <= 1 ? this.state.comments.length + " comment" : this.state.comments.length + " comments"}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                        item
                        container
                        justify="flex-start"
                        alignItems="flex-start"
                        direction="row">
                            {this.state.tags}
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        )
    }
}
