/**
 * This is a react component class for the action bar which
 * contains several buttons such as :
 * - 'Make a post'
 * - 'Text'
 * - 'Image'
 * - 'Document'
 * - 'Calendar'
 * - 'Link'
 * 
 * Please look at the UI mockup for image explanation
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CalIcon from '../../customeIcons/calIcon';
import ImageIcon from '../../customeIcons/imageIcon';
import DocIcon from '../../customeIcons/docIcon';
import LinkIcon from '../../customeIcons/linkIcon';
import TextIcon from '../../customeIcons/textIcon';
import { Button, Box, createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2B705"
        },
        secondary: {
            main: "#F2C94C"
        }
    }
});

export default class ActionBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toCreatePostPage: false,
            postType: ""
        };
    }

    handleCreatePost = (type) => {
        this.setState({
            toCreatePostPage: true,
            postType: type
        });
    }

    render() {

        // redirect to create post page
        if (this.state.toCreatePostPage === true) {

            console.log("ActionBar >> create a post of type : " + this.state.postType);

            return <Redirect exact from="/" push to={{
                pathname: "/createpost",
                state: { postType: this.state.postType }
            }}/>;
        }

        return (
            <Box 
                boxShadow={3}
                margin={1}
                width="50%"
                padding={2} >
                <ThemeProvider theme={theme}>
                    <p>
                        MAKE A POST
                    </p>
                    <Button 
                        color="secondary"
                        variant="contained"
                        startIcon={<TextIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.handleCreatePost("text")}} >
                        TEXT
                    </Button>
                    <Button 
                        color="primary"
                        variant="contained"
                        startIcon={<ImageIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.handleCreatePost("image")}} >
                        IMAGE
                    </Button>
                    <Button 
                        color="secondary"
                        variant="contained"
                        startIcon={<DocIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.handleCreatePost("document")}} >
                        DOCUMENT
                    </Button>
                    <Button 
                        color="primary"
                        variant="contained"
                        startIcon={<CalIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.handleCreatePost("calendar")}} >
                        CALENDAR
                    </Button>
                    <Button 
                        color="secondary"
                        variant="contained"
                        startIcon={<LinkIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.handleCreatePost("link")}} >
                        LINK
                    </Button>
                </ThemeProvider>
            </Box>
        )
    }
}