import React, { Component } from 'react'
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton, TextField, makeStyles, Card, CardContent, CardActions } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
import LikeIcon from '../../customeIcons/likeIcon';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

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
            theme: props.theme
        };       
        
    }



    render() {
        

        return (
            
            <ThemeProvider theme={this.state.theme} >     
                <Card className={useStyles.root} variant="outlined">
                <CardContent>
                    <Typography className={useStyles.pos} color="textSecondary">
                    {this.state.user}
                    </Typography>
                    <Typography variant="body2" component="p">
                    {this.state.content}
                    </Typography>
                </CardContent>
                </Card>
            </ThemeProvider>
        )
    }
}
