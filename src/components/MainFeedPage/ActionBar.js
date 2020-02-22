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
import { Button, Box, createMuiTheme, ThemeProvider, Grid, Typography } from '@material-ui/core';

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
            <div>
                <Box 
                    boxShadow={3}
                    margin={1}
                    padding={2} >
                    <ThemeProvider theme={theme}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={1}>
                            <Grid item >
                                <Typography variant="h6">
                                    Create A Post : 
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Button 
                                    color="secondary.main"
                                    variant="contained"
                                    startIcon={<TextIcon />}
                                    disableElevation
                                    type="button"
                                    onClick={() => {this.handleCreatePost("text")}} >
                                    TEXT
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button 
                                    color="primary.main"
                                    variant="contained"
                                    startIcon={<ImageIcon />}
                                    disableElevation
                                    type="button"
                                    onClick={() => {this.handleCreatePost("image")}} >
                                    IMAGE
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button 
                                    color="secondary.main"
                                    variant="contained"
                                    startIcon={<DocIcon />}
                                    disableElevation
                                    type="button"
                                    onClick={() => {this.handleCreatePost("document")}} >
                                    DOCUMENT
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button 
                                    color="primary.main"
                                    variant="contained"
                                    startIcon={<CalIcon />}
                                    disableElevation
                                    type="button"
                                    onClick={() => {this.handleCreatePost("calendar")}} >
                                    CALENDAR
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button 
                                    color="secondary.main"
                                    variant="contained"
                                    startIcon={<LinkIcon />}
                                    disableElevation
                                    type="button"
                                    onClick={() => {this.handleCreatePost("link")}} >
                                    LINK
                                </Button>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                </Box>
            </div>
            
        )
    }
}