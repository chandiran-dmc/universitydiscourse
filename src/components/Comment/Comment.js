import React, { Component } from 'react'
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton, TextField, makeStyles, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { red, blue, grey } from '@material-ui/core/colors';
const axios = require('axios');


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;

}




const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default class Comment extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            content: props.data.content,
            user: props.data.user,
            time: props.data.time,
            theme: props.theme,
            editDialog: false,
            dialogContent: "",
            _id: props.data._id,

            likeCountComment: props.data.likeCountComment,
            upvoteCountComment: props.data.upvoteCountComment,
            downvoteCountComment: props.data.downvoteCountComment,
            likeArrayComment: props.data.likeArrayComment,
            upvoteArrayComment: props.data.upvoteArrayComment,
            downvoteArrayComment: props.data.downvoteArrayComment,
        };       
        
        this.handleChange = this.handleChange.bind(this);
        
    }

    
    onSubmitLike = (event) => {
        // alert("YOU LIKED THE POST");
        // alert(this.state.likeCount);
        console.log(this.state.likeCount)
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-comment/like',
            data: {
                like_user: localStorage.getItem("username"),
                user:this.state.user,
                time: this.state.time,
                likeCountComment: this.state.likeCountComment+1,
                likeArrayComment: this.state.likeArrayComment,
                id: this.state._id
            }
        })
        .then((response) => {
            this.renderSet(response.data.message, "info");
            //alert(response.data.likeCount);
            //alert(response.data.data.likeArray);
            this.setState({likeCountComment: response.data.likeCountComment})
            this.setState({likeArrayComment: response.data.likeArrayComment})
            
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
        console.log(this.state.upvoteCountComment)
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-comment/upvote',
            data: {
                like_user: localStorage.getItem("username"),
                user: this.state.user,
                time: this.state.time,
                upvoteCountComment: this.state.upvoteCountComment+1,
                upvoteArrayComment: this.state.upvoteArrayComment,
                id: this.state._id
            }
        })
        .then((response) => {
            this.renderSet(response.data.message, "info");
            //alert(response.data.likeCount);
            //alert(response.data.data.likeArray);
            this.setState({upvoteCountComment: response.data.upvoteCountComment})
            this.setState({upvoteArrayComment: response.data.upvoteArrayComment})
            
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
        console.log(this.state.downvoteCountComment)
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-comment/downvote',
            data: {
                like_user: localStorage.getItem("username"),
                user: this.state.user,
                time: this.state.time,
                downvoteCountComment: this.state.downvoteCountComment+1,
              
                downvoteArrayComment: this.state.downvoteArrayComment,
                id: this.state._id
            }
        })
        .then((response) => {
            //if (response.data.message.localeCompare("already")) {
                this.renderSet(response.data.message, "info");
            //}
           
            //alert(response.data.likeCount);
            //alert(response.data.data.likeArray);
            this.setState({downvoteCountComment: response.data.downvoteCountComment})
            this.setState({downvoteArrayComment: response.data.downvoteArrayComment})
        
        })
        .catch((error) => {
        
            //console.log("THIS IS THE ERROR");
            //console.log(error);
            return;
            

        });
       
    }    

    






    handleChange(event) {
        this.setState(
            {
                dialogContent: event.target.value
            }
        );       
    }

    ChangeComment = () => {
        //event.preventDefault();
        
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-comment/updatecomment',
            data: {
                _id: this.state._id,
                content: this.state.dialogContent,            
            }
        })
        .then((response) => {
            console.log(response);
            this.setState(
                {
                    content: this.state.dialogContent,
                    editDialog: false,
                }
            );   
            
            this.renderSet("You have successfully edited the comment!", "success");
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }

    DeleteComment(event) {
        var addTodo = this.props.addTodo;
        
        //event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-comment/deletecomment',
            data: {
                _id: this.state._id,
                content: this.state.dialogContent,            
            }
        })
        .then((response) => {
            console.log(response);
            this.setState(
                {
                    content: this.state.dialogContent,
                    editDialog: false,

                }
            );   
            addTodo();
            //this.renderSet("You have successfully deleted the comment!", "success");
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
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
        

        return (
            
            <ThemeProvider theme={this.state.theme} >     
                {this.renderAlert()}
                <Box
                    boxShadow={2}
                    margin={2}
                    padding={2}
                    minWidth = {600}
                    bgcolor="post_primary.main" >
                    <Grid container 
                            wrap="nowrap" 
                            direction="row"
                            spacing={2}>
                        <Grid item>
                            <Avatar>{this.state.user}</Avatar>
                        </Grid>
                        <Grid item>
                            <Typography className={useStyles.pos} color="textSecondary">
                            {this.state.user}
                            </Typography>
                        </Grid>                        
                        <Grid item>
                            <Typography 
                                variant="caption"
                                color="textSecondary" >
                                {new Date(this.state.time).toTimeString()}
                            </Typography>
                        </Grid>
                        <Grid container justify="flex-end">
                            <IconButton type="button" onClick={() => (localStorage.getItem("username") === this.state.user)?this.setState({editDialog: true}):this.renderSet("You cannot edit this comment", "error")}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        wrap="nowrap" 
                        spacing={2}
                        direction="column">
                        


                        <Grid item>
                        <Typography variant="body2" component="p">
                        {this.state.content}
                        </Typography>
                        </Grid>


                    </Grid>

                    <Dialog open={this.state.editDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Are you sure you want to edit this comment?</DialogTitle>
                        <DialogContent>
                        <TextField
                                id="outlined-full-width"
                                label={"Edit Comment"} 
                                style={{ margin: 1 }}
                                fullWidth="true"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue = {this.state.content}
                                onChange={this.handleChange}
                                variant="outlined"/>
                        </DialogContent>
                        
                        <DialogActions>
                        <Button onClick={() => this.ChangeComment()} color="primary">
                            Edit Comment
                        </Button>                       
                         
                        </DialogActions>
                        <DialogActions>
                        <Button onClick={() => this.DeleteComment()} color="primary">
                            Delete Comment
                        </Button>
                        <Button onClick={() => this.setState({editDialog: false})} color="primary">
                            Cancel
                        </Button>
                        </DialogActions>
                    </Dialog>

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
                                //onClick={() => (this.state.likeArrayComment.includes(localStorage.getItem('username')))?this.onSubmitUnlike():this.onSubmitLike()} 
                                onClick={this.onSubmitLike} 
                                    >
                                <FavoriteIcon style={{ color: red[300] }}/>
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                                {this.state.likeCountComment}
                            </Typography>
                        </Grid>
                        
                        
                        <Grid item>
                            <IconButton 
                                type="button"
                                //onClick={() => (this.state.upvoteArrayComment.includes(localStorage.getItem('username')))?this.onSubmitCancelUpVote():this.onSubmitUpVote()} 
                                        onClick={this.onSubmitUpVote} 
                                    >
                                <ThumbUpIcon style={{ color: blue[600] }}/>
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                                {this.state.upvoteCountComment}
                            </Typography>
                        </Grid>
                        
                        
                        <Grid item>
                            <IconButton 
                                type="button"
                                //onClick={() => (this.state.downvoteArrayComment.includes(localStorage.getItem('username')))?this.onSubmitCancelDownVote():this.onSubmitDownVote()} 
                                        onClick={this.onSubmitDownVote} 
                                    >
                                 <ThumbDownIcon style={{ color: blue[800] }}/>
                            </IconButton>
                        </Grid>
                        
                        <Grid item>
                            <Typography variant="body2">
                                {this.state.downvoteCountComment}
                            </Typography>
                        </Grid>
                        
                    </Grid>





                </Box>
            </ThemeProvider>
        )
    }
}
