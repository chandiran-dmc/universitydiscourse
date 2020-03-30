import React, { Component } from 'react'
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton, TextField, createMuiTheme, Paper, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '../../customeIcons/menuIcon';
import LikeIcon from '../../customeIcons/likeIcon';
import { Redirect } from 'react-router-dom';
import Comment from './../Comment';
const axios = require('axios');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2B705"
        },
        secondary: {
            main: "#F2C94C"
        },
        post_primary: {
            main: "#F2F2F2"
        },
        post_secondary: {
            main: "#757575"
        },
        text: {
            main: "#000000",
            sub: "#9B9B9B"
        },
        iconButton: {
          padding: 10,
        },
    }
});



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
            comments: [],
            _id: props.data._id,
            commentContent: ""
        };       
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                commentContent: event.target.value
            }
        );       
    }

    createComment = () => {
        //event.preventDefault();
        let username = localStorage.getItem("username");
        //console.log(this.state.title);
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-comment/comment',
            data: {
                postid: this.state._id,
                content: this.state.commentContent,
                user: username,
                time: new Date().getTime()                
            }
        })
        .then((response) => {
            console.log(response);
            this.getComments();
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }

    getComments = async () => {
        this.setState({
            seeallcomments: !this.state.seeallcomments
        })
        console.log(this.state._id);
        // TODO: request the database for the comments
        let commentlist = []
        // Send request to the database
        axios({
                method: 'post',
                url: 'http://localhost:3000/api-comment/getcomments',
                data: {
                    postid: this.state._id,              
                }
        })
        .then((response) => {
                commentlist = response.data.data;
                console.log(response.data.data);
                let comments = []
                commentlist.forEach((comment) => {
                    if (comment.postid == this.state._id) {
                        comments.push(<Comment key={Math.random()*100000} data={comment} theme={theme}/>);
                    }
                });
                
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
                                
                            </Grid>
                                                        
                        </Grid>
                        <Grid 
                            container
                            wrap="nowrap"
                            spacing={0}
                            justify="flex-start"
                            alignItems="center"
                            direction="row">


                            <Grid item width={400}>

                                <TextField
                                id="outlined-full-width"
                                label={"Comment as " + localStorage.getItem('username')} 
                                style={{ margin: 1 }}
                                placeholder="What are your thoughts?"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue = ""
                                onChange={this.handleChange}
                                variant="outlined"/>


                            </Grid>
                            <Grid container justify="flex-end" >
                                <Grid item>
                                    <Button
                                        variant="contained" onClick={() => this.createComment()}>
                                        {"Post Comment"}
                                    </Button>
                                </Grid>
                                
                                <Grid item>
                                <Button
                                    variant="contained" onClick={() => this.getComments()}>
                                    {"See all comments"}
                                </Button>
                                </Grid>


                            </Grid>




                            </Grid>








                        
                        










                        
                        <Grid 
                            container
                            wrap="nowrap"
                            justify="flex-start"
                            alignItems="center"
                            direction="row">
                            
                            
                            {(this.state.makeacomment == true)?                                
                                    <TextField id="filled-basic" label="Post Comment" variant="filled"/>:""                                   
                                
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
