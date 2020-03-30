import React, { Component } from 'react';
import TopBar from '../TopBar';
//import Footer from '../Footer';
import ActionBar from './ActionBar';
import Post from './../Post';
import SideBar from '../SideBar';
import { Grid, createMuiTheme } from '@material-ui/core';
import './MainFeedPage.css';
import sample_tags from '../../mock_data/AllTags.json';
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

export default class MainFeedPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredPosts: []
        };
        // let all =  [];
        // let i = 0
        // all = sample_tags.AllTag;
        // for(i = 0; i < all.length; i++) {
        //     axios({
        //         method: 'post',
        //         url: "http://localhost:3000/api/createCourse",
        //         data: {
        //            name: all[i]
        //         }
        //     })
        //     .then((response) => {
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         alert('An error occurred');
        //     });


        }
        
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
        
      return (
          <div className="MainFeedPage">

              <SideBar />

              <Grid 
                  container
                  spacing={3}
                  direction="column"
                  justify="space-around"
                  alignItems="center" >
                  {/* <Grid item >
                      <TopBar /> 
                  </Grid> */}
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
                                  <ActionBar theme={theme}/>
                              </Grid>
                              <Grid item>
                                  {this.state.filteredPosts === null ? <p>Fetching data</p> : this.state.filteredPosts}
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>                
          </div>
      );
    }
}
