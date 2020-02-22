/**
 * This is a react component for showing following tags
 * This is the component on the right of the posts in the main feed page
 */

import React, { Component } from 'react';
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

export default class FollowingTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: props.tags
        };
    }

    handleRemoveTag = () => {

    }

    renderTags = () => {
        // react component of tags
        let tags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            tags[i] = (
                <div>
                    <p>{this.state.tags[i]}</p>
                </div>
            );
        }
        return tags;
    }

    render() {
        return (
            <ThemeProvider theme={theme} >
                <Box 
                    boxShadow={3}
                    margin={1}
                    padding={2}
                    bgcolor="primary.main" >
                    
                    <h3>Following Tags</h3>
                    {this.renderTags()}
                </Box>
            </ThemeProvider>
        )
    }
}
