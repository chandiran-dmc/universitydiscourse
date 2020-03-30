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
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
//import Warning from '../../customeIcons/Warning';
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
            isReportPost: false,
            reportCount: props.data.reportCount,
            likeCount: props.data.likeCount,
            upvoteCount: props.data.upvoteCount,
            downvoteCount: props.data.downvoteCount,
            reportArray: props.data.reportArray,
            likeArray: props.data.likeArray,
            upvoteArray: props.data.upvoteArray,
            downvoteArray: props.data.downvoteArray,
            reportArrayindex: props.data.reportArrayindex,
            id: props.data._id,
            //report: props.data.report,
            mode: "",
            
            
        };       
    }

    onSubmitLike = (event) => {
        // alert("YOU LIKED THE POST");
        // alert(this.state.likeCount);
        console.log(this.state.likeCount)
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/like',
            data: {
                user: this.state.user,
                time: this.state.time,
                likeCount: this.state.likeCount+1,
                likeArray: this.state.likeArray,
                id: this.state.id
            }
        })
        .then((response) => {
            alert(response.data.message);
            //alert(response.data.likeCount);
            //alert(response.data.data.likeArray);
            this.setState({likeCount: response.data.likeCount})
            this.setState({likeArray: response.data.likeArray})
            
        })
        .catch((error) => {
        
            alert("THIS IS THE ERROR");
            console.log(error);
            return;
            

        });
        
    }    

    onSubmitUpVote = (event) => {
        // alert("YOU UPVOTED THE POST");
        // alert(this.state.upvoteCount);
        console.log(this.state.upvoteCount)
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/upvote',
            data: {
                user: this.state.user,
                time: this.state.time,
                upvoteCount: this.state.upvoteCount+1,
                upvoteArray: this.state.upvoteArray,
                id: this.state.id
            }
        })
        .then((response) => {
            alert(response.data.message);
            //alert(response.data.likeCount);
            //alert(response.data.data.likeArray);
            this.setState({upvoteCount: response.data.upvoteCount})
            this.setState({upvoteArray: response.data.upvoteArray})
            
        })
        .catch((error) => {
        
            console.log("THIS IS THE ERROR");
            console.log(error);
            return;
            

        });
        
    } 

    onSubmitDownVote = (event) => {
        // alert("YOU DOWNVOTED THE POST");
        // alert(this.state.downvoteCount);
        console.log(this.state.downvoteCount)
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/downvote',
            data: {
                user: this.state.user,
                time: this.state.time,
                downvoteCount: this.state.downvoteCount+1,
              
                downvoteArray: this.state.downvoteArray,
                id: this.state.id
            }
        })
        .then((response) => {
            //if (response.data.message.localeCompare("already")) {
                alert(response.data.message);
            //}
           
            //alert(response.data.likeCount);
            //alert(response.data.data.likeArray);
            this.setState({downvoteCount: response.data.downvoteCount})
            this.setState({downvoteArray: response.data.downvoteArray})
            
        })
        .catch((error) => {
        
            console.log("THIS IS THE ERROR");
            console.log(error);
            return;
            

        });
       
    }    


    handleRedirect = (mode) => {
        if (mode === "editpost") {
            if(this.state.user === localStorage.getItem("username")) {

                this.setState({
                    mode: "editpost",
                    isEditPost: true
                });

            }
            else {
                alert('You can not edit this post');
            }
        }
        else {
            this.setState({
                mode: "reportpost",
                isReportPost: true
            });
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

        if (this.state.isReportPost === true) {

            return <Redirect exact from="/" push to={{
                pathname: "/reportpost",
                state: { 
                    title: this.state.title,
                    content: this.state.content,
                    user: this.state.user,
                    time: this.state.time,
                    tags: this.state.tags,
                    comments: this.state.comments,
                    type: this.state.type,
                    count: this.state.count,
                    mode: this.state.mode,
                    reportCount: this.state.reportCount,
                    id: this.state.id,
                    reportArray: this.state.reportArray,
                    reportArrayindex: this.state.reportArrayindex,
                    //report: this.state.report
            

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
                                onClick={() => this.handleRedirect("reportpost")} >
                                <i className="fa fa-bullhorn"></i>
                            </IconButton>
                        </Grid>
                        
                        <Grid item>
                            <IconButton 
                                type="button"
                                onClick={() => this.handleRedirect("editpost")} >
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
                                        onClick={this.onSubmitLike} 
                                        >
                                        <i class="fa fa-heart"></i>
                                    </IconButton>
                                </Grid>

                                <Grid item>
                                    <Typography variant="body2">
                                        {this.state.likeCount}
                                    </Typography>
                                </Grid>
                               
                               
                                <Grid item>
                                    <IconButton 
                                        type="button"
                                        onClick={this.onSubmitUpVote}
                                         >
                                        <i class="fa fa-thumbs-up"></i>
                                    </IconButton>
                                </Grid>

                                <Grid item>
                                    <Typography variant="body2">
                                        {this.state.upvoteCount}
                                    </Typography>
                                </Grid>
                                
                                
                                <Grid item>
                                    <IconButton 
                                        type="button"
                                        onClick={this.onSubmitDownVote} 
                                        >
                                        <i class="fa fa-thumbs-down"></i>
                                    </IconButton>
                                </Grid>
                                
                                <Grid item>
                                    <Typography variant="body2">
                                        {this.state.downvoteCount}
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
                                #{this.state.tags.toString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        )
    }
}
