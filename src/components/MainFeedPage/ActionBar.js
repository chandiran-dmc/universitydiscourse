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
import GradeIcon from '../../customeIcons/gradeIcon';
import { Button, Box, ThemeProvider, Grid, Typography } from '@material-ui/core';

export default class ActionBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toCreatePostPage: false,
            type: "",
            theme: props.theme
        };
    }

    handleCreatePost = (type) => {
        this.setState({
            toCreatePostPage: true,
            type: type
        });
    }

    render() {

        // redirect to create post page
        if (this.state.toCreatePostPage === true) {

            console.log("ActionBar >> create a post of type : " + this.state.type);

            return <Redirect exact from="/" push to={{
                pathname: "/createpost",
                state: { type: this.state.type }
            }}/>;
        }

        return (
            <ThemeProvider theme={this.state.theme}>
                <Box 
                    boxShadow={2}
                    margin={1}
                    padding={2} >
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
                                color="secondary"
                                variant="contained"
                                startIcon={<TextIcon />}
                                type="button"
                                onClick={() => {this.handleCreatePost("text")}} >
                                TEXT
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button 
                                color="primary"
                                variant="contained"
                                startIcon={<ImageIcon />}
                                type="button"
                                onClick={() => {this.handleCreatePost("image")}} >
                                IMAGE
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button 
                                color="secondary"
                                variant="contained"
                                startIcon={<DocIcon />}
                                type="button"
                                onClick={() => {this.handleCreatePost("document")}} >
                                DOCUMENT
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button 
                                color="primary"
                                variant="contained"
                                startIcon={<CalIcon />}
                                type="button"
                                onClick={() => {this.handleCreatePost("calendar")}} >
                                CALENDAR
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button 
                                color="secondary"
                                variant="contained"
                                startIcon={<LinkIcon />}
                                type="button"
                                onClick={() => {this.handleCreatePost("link")}} >
                                LINK
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button 
                                color="primary"
                                variant="contained"
                                startIcon={<GradeIcon />}
                                type="button"
                                onClick={() => {this.handleCreatePost("grade")}} >
                                GRADE
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        )
    }
}