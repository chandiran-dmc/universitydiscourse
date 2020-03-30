import React, { Component } from 'react'
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton, TextField, makeStyles, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
            _id: props.data._id
        };       
        
        this.handleChange = this.handleChange.bind(this);
        
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
                    editDialog: false
                }
            );   
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }


    render() {
        

        return (
            
            <ThemeProvider theme={this.state.theme} >     
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
                            <IconButton type="button" onClick={() => this.setState({editDialog: true})}>
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
                                fullWidth
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
                        <Button onClick={() => this.setState({editDialog: false})} color="primary">
                            Cancel
                        </Button>
                        </DialogActions>
                    </Dialog>





                </Box>
            </ThemeProvider>
        )
    }
}
