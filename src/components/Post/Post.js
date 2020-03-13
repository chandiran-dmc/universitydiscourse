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
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
import LikeIcon from '../../customeIcons/likeIcon';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Post extends Component {

    constructor(props) {
        super(props);
        console.log(props.data._id)

        // button tags
        let tags = [];
        props.data.tag.forEach(tag => {
            tags.push(
                <Button
                    key={Math.random()*100000}
                    onClick={() => {this.tagOnClick(tag)}}
                    disableElevation
                    size="small">
                    #{tag}
                </Button>
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
            postRedirect: ""
        };       
    }

    tagOnClick = (tag) => {
        if (window.confirm(`Would you like to follow ${tag}?`)) {
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
                content = <img src={this.state.content} alt={"Error with loading"} width="600"/>
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
        if (this.state.isRedirectPost == true) {
            return <Redirect exact from="/" push to={{
                pathname: "/post" + this.state.id
            }}/>
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
                                <Button
                                    variant="contained">
                                    {this.state.comments.length <= 1 ? this.state.comments.length + " comment" : this.state.comments.length + " comments"}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography variant="inherit">
                                {this.state.tags}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        )
    }
}
