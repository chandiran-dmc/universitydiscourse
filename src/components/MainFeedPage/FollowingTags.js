/**
 * This is a react component for showing following tags
 * This is the component on the right of the posts in the main feed page
 */

import React, { Component } from 'react';
import { Grid, IconButton, createMuiTheme, ThemeProvider, Typography, Box } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';


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

    handleRemoveTag = (tagName) => {
        alert('Remove tag ' + tagName + ' ?')
    }

    renderTags = () => {
        // react component of tags
        let tags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            tags[i] = (
                <div>
                    <Grid item >
                        <Grid 
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center" >
                            <Grid item >
                                <Typography variant="button">
                                    {this.state.tags[i]}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <IconButton 
                                    disableElevation
                                    type="button"
                                    onClick={() => {this.handleRemoveTag(this.state.tags[i])}} >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
            );
        }
        return tags;
    }

    render() {

        return (
            <ThemeProvider theme={theme} >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end" >
                    <Box 
                        boxShadow={2}
                        margin={1}
                        padding={2}
                        bgcolor="primary.main" >
                        <Typography variant="h6">
                            Following Tags
                        </Typography>
                        {this.renderTags()}
                    </Box>
                </Grid>
            </ThemeProvider>
        )
    }
}
