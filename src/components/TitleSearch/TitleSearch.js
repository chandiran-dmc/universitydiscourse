import React, { Component } from 'react';
import Post from './../Post';
import { Grid, createMuiTheme, Button, TextField, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const axios = require('axios');

const theme = createMuiTheme({
    palette: {
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

export default class TagSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredPosts: [],
            alert: false,
            alertText: "",
            alertType: "",
            check: true,
            title: ""
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        
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
    handleChangeTitle(event) {
        this.setState(
            {
                title: event.target.value,
            }
        );
    } 

    /**
     * Helper function to get the posts for the user
     * Get all the posts from hot section and filter by
     * the tags the user follows
     */
    getPosts = async () => {
        console.log(this.state.title)
        if(this.state.title == "") {
            this.setState({
                filteredPosts: []
            })
            alert("Search field is empty")
           // this.renderAlert("Search field is empty")
            return
        }
        // Send request to the database
        // this.setState({
        //     check: false
        // })
        axios({
                method: 'get',
                url: 'http://localhost:3000/api/getposts'
        })
        .then((response) => {
            
            let posts = [];
            posts = response.data.data;

                let filteredPosts = [];

                posts.forEach((post) => {
                    console.log(post.title)
                        if (post.title.toLocaleLowerCase().includes(this.state.title.toLocaleLowerCase())) {
                            filteredPosts.push(<Post key={Math.random()*100000} data={post} theme={theme}/>);
                            console.log(post)
                        }
                    
                });
                
                this.setState({
                    filteredPosts: filteredPosts,
                    check: false
                });
                
        })
        .catch((error) => {
                console.error(error);
                alert('An error occurred');
            });
    }

    render() {
      return (
          
          <div className="MainFeedPage">
            {this.renderAlert()}

              <Grid 
                  container
                  spacing={2}
                  direction="column"
                  justify="space-around"
                  alignItems="center" >
                      <Grid item>
                            <Typography variant="h6">Search for Title</Typography>
                      </Grid>
                   <Grid item >
                        <TextField data-testid="title-search" id="filled-basic" label="Search Title" variant="filled" size="medium" onChange={this.handleChangeTitle} defaultValue={this.state.title}/>                      
                  </Grid> 
                  <Grid item>
                  <Button 
                    color="secondary"
                    data-testid="search-button"
                    variant="contained"
                    type="button"
                    onClick={() => {this.getPosts()}} >
                        <SearchIcon />
                    Search
                  </Button>
                  </Grid>
                  <Grid 
                      container
                      wrap="nowrap" 
                      spacing={3}
                      direction="row"
                      justify="center"
                      alignItems="flex-start" >
                      <Grid item>
                          <Grid container
                              wrap="nowrap"
                              spacing={2}
                              direction="column">
                              <Grid item>
                              </Grid>
                              <Grid item>
                                  {this.state.filteredPosts.length != 0 ? this.state.filteredPosts : this.state.check ? <p> </p>: <p>No posts matching the current search.</p>}
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>                
          </div>
      );
    }
}
