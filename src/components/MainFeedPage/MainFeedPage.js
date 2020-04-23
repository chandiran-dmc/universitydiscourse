import React, { Component } from 'react';
import TopBar from '../TopBar';
import { Redirect } from 'react-router-dom';
//import Footer from '../Footer';
import ActionBar from './ActionBar';
import Post from './../Post';
import SideBar from '../SideBar';
import { Grid, createMuiTheme, Button } from '@material-ui/core';
import './MainFeedPage.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ButtonAppBar from './AppBar'
import {ThemeProvider} from '@material-ui/styles'
import ResponsiveDrawer from './Drawer'
import CssBaseline from "@material-ui/core/CssBaseline";
import sample_tags from '../../mock_data/AllTags.json';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const axios = require('axios');

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#00305A"
        },
        primary: {
            main: "#F2B705"
        },
        secondary: {
            main: "#F2C94C"
        },
        post_primary: {
            main: "#F2F2F2"
        },
        post_secondary: {
            main: "#757575"
        },
        text: {
            main: "#000000",
            sub: "#9B9B9B"
        }
    }
});

export default class MainFeedPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            filteredPosts: [],
            alert: false,
            alertText: "",
            alertType: "",
            redirect2: false,
            redirect3: false,
            redirect4: false,
            toTagSearch: false,
            toTitleSearch: false
        };
    }

    onSubmit2 = (event) => {
        this.setState({redirect2: true});
    } 
    onSubmit3 = (event) => {
        this.setState({redirect3: true});
    } 
    onSubmit4 = (event) => {
        this.setState({redirect4: true});
    } 

    
    renderSet(text, alertType) {
        this.setState({alert: true, alertText: text, alertType: alertType});
    }

    renderAlert(text) {
        return <Snackbar open={this.state.alert} autoHideDuration={2000}  onClose={() => this.setState({alert: false})}>
                    <Alert severity={this.state.alertType}>
                    {this.state.alertText}
                    </Alert>
                </Snackbar>
    }
    redirectSearch() {
        this.setState({
            toTagSearch: true
        })
    }
    redirectTitleSearch() {
        this.setState({
            toTitleSearch: true
        })
    }
        
    

    /**
     * Helper function to get the posts for the user
     * Get all the posts from hot section and filter by
     * the tags the user follows
     */
    getPosts = async () => {

        // Send request to the database
        axios({
                method: 'get',
                url: 'http://localhost:3000/api/getposts'
        })
        .then((response) => {
            
            let posts = [];
            posts = response.data.data;

            // request user data for the tags
            axios({
                method: 'post',
                url: 'http://localhost:3000/api-user/getuser',
                data: {
                    email: localStorage.getItem("email"),
                    username: localStorage.getItem("username")
                }
            })
            .then((response) => {
                console.log(response.data.data)

                // Filter the posts based on the tags the user follows
                let tags =  response.data.data.tags.split(",");

                // save the tags to the local storage
                localStorage.setItem("tags", tags.toString());

                let filteredPosts = [];

                posts.forEach((post) => {
                    
                    for (let i = 0; i < post.tag.length; i++) {
                        if (tags.includes(post.tag[i]) || tags.includes("default")) {
                            filteredPosts.push(<Post key={Math.random()*100000} data={post} theme={theme}/>);
                            console.log(post)
                            break;
                        }
                    }
                });
                
                this.setState({
                    filteredPosts: filteredPosts
                });

            })
            .catch((error) => {
                console.error(error);
                alert('An error occurred');
            });
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }


    componentDidMount() {
        this.getPosts();
    }

    render() {

        if (this.state.redirect2 === true) {
    
            return <Redirect exact from="/" push to={{
                pathname: "/tfp",
                
            }}/>;
        }

        if (this.state.redirect3 === true) {
    
            return <Redirect exact from="/" push to={{
                pathname: "/ffp",
                
            }}/>;
        }
        if (this.state.redirect4 === true) {
    
            return <Redirect exact from="/" push to={{
                pathname: "/ffp",
                
            }}/>;
        }
        
        if (this.state.toTagSearch === true) {
            return <Redirect exact from="/" push to={{
                pathname: "/searchtag",
            }}/>;
        }
        if (this.state.toTitleSearch === true) {
            return <Redirect exact from="/" push to={{
                pathname: "/searchtitle",
            }}/>;
        }
        
      return (
        <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
          <div>
             
            {this.renderAlert()}
            
            <Grid 
                container
                justify="center"
                alignItems="center"
                direction="row">
                <Grid item>
                    <ResponsiveDrawer />
                </Grid>
                <Grid item>
                <Grid 
                    container
                    //wrap="nowrap"
                    spacing={2}
                    direction="row"
                    >
                    <Grid item>
                    <form onSubmit={this.onSubmit2}>
                    <ThemeProvider theme={theme}>
                    <Button 
                        className  = "TopFeedPageButton" 
                        variant = "contained"
                        color = "primary" 
                        type = "submit"
                        >
                        Top Feed Page
                    </Button> 
                    </ThemeProvider>
                    </form>
                    </Grid>
                    <Grid item>
                    <form onSubmit={this.onSubmit3}>
                    <ThemeProvider theme={theme}>
                    <Button 
                        className  = "TopFeedPageButton" 
                        variant = "contained"
                        color = "primary" 
                        type = "submit"
                        >
                        Filter Page
                    </Button> 
                    </ThemeProvider>
                    </form>
                    </Grid>
                    <Grid item>
                    <form onSubmit={this.onSubmit4}>
                    <ThemeProvider theme={theme}>
                    <Button 
                        className  = "TopFeedPageButton" 
                        variant = "contained"
                        color = "primary" 
                        type = "submit"
                        >
                        Saved Posts
                    </Button> 
                    </ThemeProvider>
                    </form>
                    </Grid>
                    <Grid item >
                        <Button 
                            color="secondary"
                            variant="contained"
                            type="button"
                            onClick={() => {this.redirectSearch()}} >
                            Search based on Tags
                        </Button>
                       
                  </Grid> 
                  <Grid item >
                        <Button 
                            color="secondary"
                            variant="contained"
                            type="button"
                            onClick={() => {this.redirectTitleSearch()}} >
                            Search based on Title
                        </Button>
                       
                  </Grid> 
                </Grid>
                </Grid>
                
                <Grid item>
                    
                    <Grid container
                        wrap="nowrap"
                        spacing={30}
                        direction="column">
                            
                        
                        <Grid item>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <ActionBar theme={theme}/>
                        </Grid>
                        <Grid item>
                            {this.state.filteredPosts === null ? <p>Fetching data</p> : this.state.filteredPosts}
                        </Grid>
                    </Grid>
                    
                
                </Grid>
            </Grid>            
          </div>
          </ThemeProvider>
      );
    }
}
