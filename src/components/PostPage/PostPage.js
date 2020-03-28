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



export default class PostPage extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.location.state.tags)
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
            isRedirect: false,
        };
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


