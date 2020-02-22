/**
 * This is a page for creating a post
 * The user should arrive to this page only if the user clicked
 * on the 'make a post' button
 * 
 * This page should consist of 
 * - option to choose which type of post the user wants
 * - post title field
 * - post content field
 * - tags field
 * - cancel and submit button
 * 
 * Please look at the UI mockup for image explanation
 */

import React, { Component } from 'react'
import TopBar from '../TopBar/TopBar';
import './CreatePostPage.css'
import { spacing } from '@material-ui/system';
//import { positions, borderTop, borderBottom,borderLeft, borderRight } from '@material-ui/system';
import { Button, Box, input,Grid } from '@material-ui/core';
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

export default class CreatePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.location.state.postType,
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        // This is to stop the default behavior, 
        // which in this case is stopping form from reloading itself
        event.preventDefault();
        alert('Searching for ' + this.state.value);
    }
    
    handleChange(event) {
        this.setState(
            {
                value: event.target.value
            }
        );
    }

    render() {

        console.log("CreatePostPage >> Creating post of type : " + this.state.type);

        if(this.state.type === "text") {
            return (
                <div>
                <TopBar />
                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleSearch}>
                            
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                <Box
                    boxShadow={30}
                    margin={1}
                    width="50%"
                    mt={20}

                > 

               
                 <ThemeProvider theme={theme}>
                        <label>
                            Post Title:
                            <p></p>
                            <input
                            className = "Heading"
                            type="text"
                            disableElevation
                            value={this.state.value}
                            placeholder="Post Title..."
                            onChange={this.handleChange}
                        />

                        
                        </label>
                        <label>
                        <p></p>
                            Post Content:
                        <p></p>

                            <input
                            className = "TextBox"
                            type="text"
                            value={this.state.value}
                            placeholder="Content..."
                            onChange={this.handleChange}
                        /> 
                        </label>
                        <p>

                        </p>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                         >
                        <Button 
                            color="secondary"
                            variant="contained"
                            style={{justifyContent: 'center'}}
                           // startIcon={<TextIcon />}
                            disableElevation
                            type="button"


                            onClick={() => {this.handleCreatePost("text")}} >
                            MAKE POST
                        </Button>
                        </Grid>
                        
                         {/* <input 
                        //     className="SubmitButton"
                        //     type="submit" 
                        //     value="Make Post" 
                        // /> */}
                        </ThemeProvider>
                        </Box>
                </Grid>
               


                        </form>


                    </div>

                    
                </div>
               
                
            );
        }
    
    if(this.state.type === "image") {
        return (
            <Box
                boxShadow={3}
                margin={1}
                width="50%"

            > 

            <div>
                <TopBar />
                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleSearch}>
                    <ThemeProvider theme={theme}>
                    <label>
                        Post Title:
                        <p></p>
                        <input
                        className = "Heading"
                        type="text"
                        disableElevation
                        value={this.state.value}
                        placeholder="Post Title..."
                        onChange={this.handleChange}
                    />

                    
                    </label>
                    <label>
                    <p></p>
                        Post Content:
                    <p></p>

                        <input
                        className = "TextBox"
                        type="text"
                        value={this.state.value}
                        placeholder="Content..."
                        onChange={this.handleChange}
                    /> 
                    </label>
                    <p>

                    </p>
                    <Button 
                        color="secondary"
                        variant="contained"
                        style={{justifyContent: 'center'}}
                       // startIcon={<TextIcon />}
                        disableElevation
                        type="button"

                        onClick={() => {this.handleCreatePost("text")}} >
                        MAKE POST
                    </Button>
                    
                     {/* <input 
                    //     className="SubmitButton"
                    //     type="submit" 
                    //     value="Make Post" 
                    // /> */}
                    </ThemeProvider>


                    </form>


                </div>

                
            </div>
            </Box>
        );
    }
                }
}
