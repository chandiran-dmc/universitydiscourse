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
import { Box, createMuiTheme, ThemeProvider, Grid, Avatar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
import LikeIcon from '../../customeIcons/likeIcon';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2F2F2"
        },
        secondary: {
            main: "#757575"
        },
        text: {
            main: "#000000",
            sub: "#9B9B9B"
        }
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
            count: props.data.count
        };
    }

    render() {

        return (
            <ThemeProvider theme={theme} >     
                <Box
                    boxShadow={2}
                    margin={1}
                    padding={2}
                    bgcolor="primary.main" >
                    
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
                                onClick={() => {alert('Delete?')}} >
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
                            <Typography variant="h6">
                                {this.state.content}
                            </Typography>
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
                            <Typography variant="body2">
                                #{this.state.tags}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        )
    }
}
