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
import CreateIcon from '../../customeIcons/createPostIcon';
import CalIcon from '../../customeIcons/calIcon';
import ImageIcon from '../../customeIcons/imageIcon';
import DocIcon from '../../customeIcons/docIcon';
import LinkIcon from '../../customeIcons/linkIcon';
import TextIcon from '../../customeIcons/textIcon';
import { Button, Box } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
            type: ""
        };
    }
    
    render() {

        // redirect to create post page
        if (this.state.toCreatePostPage) {
            let referral = {
                pathname: "/createpost",
                state: { type: this.state.type}
            };

            return <Redirect to={referral}/>;
        }

        return (
            <Box 
                boxShadow={3}
                margin={1}
                width="50%"
                padding={2} >
                <ThemeProvider theme={theme}>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<CreateIcon />}
                        disableElevation
                        type="button" >
                        MAKE A POST
                    </Button>
                    <Button 
                        color="secondary"
                        variant="contained"
                        startIcon={<TextIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.setState(
                            {
                                toCreatePostPage: true, 
                                type: "text"
                            })}
                        } >
                        TEXT
                    </Button>
                    <Button 
                        color="primary"
                        variant="contained"
                        startIcon={<ImageIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.setState(
                            {
                                toCreatePostPage: true, 
                                type: "image"
                            })}} >
                        IMAGE
                    </Button>
                    <Button 
                        color="secondary"
                        variant="contained"
                        startIcon={<DocIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.setState(
                            {
                                toCreatePostPage: true, 
                                type: "document"
                            })}} >
                        DOCUMENT
                    </Button>
                    <Button 
                        color="primary"
                        variant="contained"
                        startIcon={<CalIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.setState(
                            {
                                toCreatePostPage: true, 
                                type: "calendar"
                            })}} >
                        CALENDAR
                    </Button>
                    <Button 
                        color="secondary"
                        variant="contained"
                        startIcon={<LinkIcon />}
                        disableElevation
                        type="button"
                        onClick={() => {this.setState(
                            {
                                toCreatePostPage: true, 
                                type: "link"
                            })}} >
                        LINK
                    </Button>
                </ThemeProvider>
            </Box>
        )
    }
}
 