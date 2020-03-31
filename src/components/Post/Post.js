import React, { Component } from 'react'
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton, TextField, Dialog, DialogActions, DialogTitle, createMuiTheme, List, ListItem, ListItemIcon, Divider, ListItemText } from '@material-ui/core';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InboxIcon from '../../customeIcons/menuIcon';
import MenuIcon from '../../customeIcons/menuIcon';
//import Warning from '../../customeIcons/Warning';
import {FacebookShareButton} from "react-share"
import FacebookIcon from '@material-ui/icons/Facebook';
import Tag from './Tag';

import { Redirect } from 'react-router-dom';
import Comment from './../Comment';
import SchoolIcon from '@material-ui/icons/School';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { borderRight } from '@material-ui/system';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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

    

    addTodo() {
        setTimeout(()=> this.getComments(), 11);
        setTimeout(()=> this.setState({
            seeallcomments: false
        }), 10);
        setTimeout(()=> this.setState({
            seeallcomments: false
        }), 15);       

    }

    constructor(props) {
        super(props);
        console.log('props -----',props);
        

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
            mode: "",
            makeacomment: false,
            seeallcomments: false,
            comments: [],
            _id: props.data._id,
            commentContent: "",
            uniquecourse: false,
            coursename: "",

            isReportPost: false,
            reportCount: props.data.reportCount,
            likeCount: props.data.likeCount,
            upvoteCount: props.data.upvoteCount,
            downvoteCount: props.data.downvoteCount,
            reportArray: props.data.reportArray,
            likeArray: props.data.likeArray,
            upvoteArray: props.data.upvoteArray,
            downvoteArray: props.data.downvoteArray,
            //reportArraylimit: props.data.reportArraylimit,
            //report: props.data.report,
            commentuser: "",

            alert: false,
            alertText: "",
            alertType: "",
            postRedirect: "",
            rawTags: props.data.tag
            
            
        };       
        this.handleChange = this.handleChange.bind(this);
        var addTodo = this.addTodo.bind(this);
    }

    

    handleChange(event) {
        this.setState(
            {
                commentContent: event.target.value
            }
        );       
    }

    createComment = () => {
        if (this.state.commentContent === "") {
            return;
        }

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
                time: new Date().getTime(),
                likeCountComment: 0,
                upvoteCountComment: 0,
                downvoteCountComment: 0,
                likeArrayComment: [],
                upvoteArrayComment: [],
                downvoteArrayComment: [],                
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({
                commentContent: ""
            })
            this.getComments();
            this.renderSet("Comment Created!", "success");
        })
        .catch((error) => {
            console.error(error);
            this.renderSet("An error occurred");
        });
    }

    getComments = async () => {
        this.setState({
            seeallcomments: true
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
                        comments.push(<Comment key={Math.random()*100000} data={comment} theme={theme} addTodo={this.addTodo.bind(this)}/>);
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
    

    
    onSubmitLike = (event) => {
        // alert("YOU LIKED THE POST");
        // alert(this.state.likeCount);
        console.log(this.state.likeCount)
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/like',
            data: {
                like_user: localStorage.getItem("username"),
                user:this.state.user,
                time: this.state.time,
                likeCount: this.state.likeCount+1,
                likeArray: this.state.likeArray,
                id: this.state.id
            }
        })
        .then((response) => {
            this.renderSet(response.data.message, "info");
            //alert(response.data.message);
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
                like_user: localStorage.getItem("username"),
                user: this.state.user,
                time: this.state.time,
                upvoteCount: this.state.upvoteCount+1,
                upvoteArray: this.state.upvoteArray,
                id: this.state.id
            }
        })
        .then((response) => {
            this.renderSet(response.data.message, "info");
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
                like_user: localStorage.getItem("username"),
                user: this.state.user,
                time: this.state.time,
                downvoteCount: this.state.downvoteCount+1,
              
                downvoteArray: this.state.downvoteArray,
                id: this.state.id
            }
        })
        .then((response) => {
            //if (response.data.message.localeCompare("already")) {
            this.renderSet(response.data.message, "info");
            //}
           
            //alert(response.data.likeCount);
            //alert(response.data.data.likeArray);
            this.setState({downvoteCount: response.data.downvoteCount})
            this.setState({downvoteArray: response.data.downvoteArray})
        
        })
        .catch((error) => {
        
            //console.log("THIS IS THE ERROR");
            //console.log(error);
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

    handleButton = (re) => {
        console.log(re);
        this.setState({
            uniquecourse: true,
            coursename: this.state.rawTags[re]
        })
        
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

            
        
            case "calendar":
                    var content2 = []
                    for (let i = 0; i < this.state.tags.length; i++) {
                        
                        content2.push( <div>
                        <List component="nav" aria-label="main mailbox folders"> 
                        
                        <ThemeProvider theme={theme}>                 
                            <ListItem button onClick={() => this.handleButton(i)}>
                                <ListItemIcon>
                                <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary={this.state.rawTags[i]} />
                            </ListItem>
                            
                            <Divider />      
                            </ThemeProvider>    
                                          
                        </List>
                    </div>);
                    }
                

                content = content2
                break;
            
                

            default:
                break;
        }

        return content;
    }
    
    renderSet(text, alertType) {
        this.setState({alert: true, alertText: text, alertType: alertType});
    }

    renderAlert(text) {
        return <Snackbar open={this.state.alert} autoHideDuration={2000}  onClose={() => this.setState({alert: false})}>
                    <Alert severity={this.state.alertType}>
                    {this.state.alertText}
                    </Alert>
                </Snackbar>
    }


    render() {
        console.log(this.state.tags.toString)
        var url = `universitydiscourse.herokuapp.com/post/${this.state.id}`
        if (this.state.isEditPost === true) {
            console.log(this.state.isEditPost)

            return <Redirect exact from="/" push to={{
                pathname: "/editpost",
                state: { 
                    title: this.state.title,
                    content: this.state.content,
                    user: this.state.user,
                    time: this.state.time,
                    tags: this.state.tags,
                    //comments: this.state.comments,
                    type: this.state.type,
                    //count: this.state.count,
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

        if (this.state.uniquecourse === true) {

            return <Redirect exact from="/" push to={{
                pathname: "/course/" + this.state.coursename,
            }}/>;
        }
        if (this.state.isReportPost === true) {

            return <Redirect exact from="/" push to={{
                pathname: "/reportpost",
                state: { 
                    user: this.state.user,
                    time: this.state.time,
                    reportCount: this.state.reportCount,
                    id: this.state.id,
                    reportArray: this.state.reportArray,
                    //reportArraylimit: this.state.reportArraylimit,
                    //report: this.state.report
            

                }
            }}/>;
        }

        return (
            
            <ThemeProvider theme={this.state.theme} >
                {this.renderAlert()}
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
                        <Grid item >
                            <IconButton 
                                type="button">
                            <FacebookShareButton url={url} quote={this.state.title} hashtag= {"#" + this.state.rawTags}>
                            <FacebookIcon  fontSize="medium"/>
                            <meta property = "og:title" content={this.state.title} />
                            </FacebookShareButton>
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton 
                                type="button"
                                onClick={() => (this.state.reportArray.includes(localStorage.getItem('username')))?this.renderSet("You cannot report a post twice!", "error"):this.handleRedirect("reportpost")} >
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
                                                        
                        </Grid>
                        <Grid 
                            container
                            wrap="nowrap"
                            spacing={0}
                            justify="flex-start"
                            alignItems="center"
                            direction="row">

                            <TextField
                            id="outlined-full-width"
                            label={"Comment"} 
                            
                            style={{ margin: 1 }}
                            placeholder="What are your thoughts?"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue = ""
                            value = {this.state.commentContent}
                            onChange={this.handleChange}
                            variant="outlined"/>

                            <Grid container justify="flex-end" >
                                <Grid item>
                                    <Button
                                        variant="contained" onClick={() => this.createComment()}>
                                        {
                                            <InsertCommentIcon />
                                        }
                                    </Button>
                                </Grid>
                                
                                <Grid item>
                                    {(this.state.seeallcomments === true)?<Button
                                    variant="contained" onClick={() => this.setState({seeallcomments: false})}>
                                    {
                                        <ExpandLessIcon />
                                    }
                                </Button>:<Button
                                    variant="contained" onClick={() => this.getComments()}>
                                    {
                                        <ExpandMoreIcon />
                                    }
                                </Button>}
                                
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
                    <Grid
                        item
                        container
                        justify="flex-start"
                        alignItems="flex-start"
                        direction="row">
                            {this.state.tags}
                        


                    </Grid>

                </Box>
            </ThemeProvider>
        )
    }
}
