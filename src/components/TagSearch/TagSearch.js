import React, { Component } from 'react';
import Post from './../Post';
import { Grid, createMuiTheme, Button, TextField, Typography } from '@material-ui/core';
// import './MainFeedPage.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TagButton from './TagButton';
import SearchIcon from '@material-ui/icons/Search';
import SelectInput from '@material-ui/core/Select/SelectInput';



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
            toTagSearch: false,
            all: [],
            tags: [],
            tagsDisplay: [],
            check: false
        };
        //localStorage.setItem("tags", "CS307");
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/getcourses'
          })
          .then((response) => {
            let all = []
            for(let i = 0; i < response.data.data.length; i++) {
                all.push(response.data.data[i].name)
            }
            this.setState({
                all: all
            })        
          })
          .catch((error) => {
              console.error(error);
              alert('An error occurred');
          });

          this.handleChangeTags = this.handleChangeTags.bind(this);
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
    handleCheck() {
        if(this.state.check == false) {
            setTimeout(() => {  this.state.check = true; }, 2000);
        }
    }

    handleChangeTags(event, values) {
        console.log(event.target.value)
      
      if(event.target.value === 0 || this.state.all.includes(event.target.value) || event.target.value == null) {
        
          this.setState({
              tags: values,
          })
          console.log(this.state.tags)
       }
       else if(!this.state.all.includes(event.target.value) && event.target.value != null) {
            alert("Tag doesn't exist")
            values.pop()
        } 
        
    
    }

    

    /**
     * Helper function to get the posts for the user
     * Get all the posts from hot section and filter by
     * the tags the user follows
     */
    getPosts = async () => {
        let tagsDisplay = [];
        this.state.tags.forEach(tag => {
        tagsDisplay.push(
            <TagButton name={tag} key={Math.random()*100000} />
        );
        })
        this.setState({
            tagsDisplay: tagsDisplay,
        })

        // Send request to the database
        axios({
                method: 'get',
                url: 'http://localhost:3000/api/getposts'
        })
        .then((response) => {
            
            let posts = [];
            posts = response.data.data;

                let filteredPosts = [];

                posts.forEach((post) => {

                    for (let i = 0; i < post.tag.length; i++) {
                        if (this.state.tags.includes(post.tag[i])) {
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
    }


    componentDidMount() {
        this.getPosts();
    }

    render() {
        this.handleCheck()
        console.log(this.state.filteredPosts)
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
                            <Typography variant="h6">Search for Tags</Typography>
                      </Grid>
                   <Grid item >
                        <div style={{ width: 300 }}>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={this.state.all}

                                onChange={this.handleChangeTags}
                                freeSolo
                                renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Select Tags"
                                    margin ="normal"
                                    fullWidth
                                />
                                )}
                            />
                        </div>
                       
                  </Grid> 
                  <Grid item>
                  <Button 
                    color="secondary"
                    variant="contained"
                    type="button"
                    onClick={() => {this.getPosts()}} >
                        <SearchIcon />
                    Search
                  </Button>
                  </Grid>
                  <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        direction="row">
                            {this.state.tagsDisplay}
                        


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
                                  {!this.state.check ? <p> </p> : this.state.filteredPosts.length != 0 ? this.state.filteredPosts : this.state.tags.length != 0 ? <p> </p> : <p>No posts with matching tags</p>}
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>                
          </div>
      );
    }
}
