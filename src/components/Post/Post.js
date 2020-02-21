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
import { Box, createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2F2F2"
        },
        secondary: {
            main: "#757575"
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
            tags: props.data.tags,
            comments: props.data.comments,
            type: props.data.type,
            count: props.data.count
        };
    }

    render() {

        return (
            <ThemeProvider theme={theme} >
                <Box 
                    boxShadow={3}
                    margin={1}
                    padding={2}
                    bgcolor="primary.main" >
                    <p>title: {this.state.title}</p> 
                    <p>user: {this.state.user}</p>
                    <p>time: {new Date(this.state.time).toString()}</p>
                    <p>content: {this.state.content}</p>
                    <p>type: {this.state.type}</p>
                    <p>upvote: {this.state.count}</p>
                    <p>comments: {this.state.comments.length}</p>
                </Box>
            </ThemeProvider>
        )
    }
}
