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
import { Button, Box, Grid, TextField, InputAdornment } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ResponsiveDrawer from '../MainFeedPage/Drawer';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axios = require('axios');

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#00305A",
    },
    primary: {
      main: "#F2B705",
    },
    secondary: {
      main: "#F2C94C",
    },
    post_primary: {
      main: "#F2F2F2",
    },
    post_secondary: {
      main: "#757575",
    },
    text: {
      main: "#000000",
      sub: "#9B9B9B",
    },
  },
});




export default class CreatePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            type: this.props.location.state.type,
            mode: this.props.location.state.mode,
            title: (this.props.location.state.title === undefined ? "" : this.props.location.state.title),
            content: (this.props.location.state.content === undefined ? "" : this.props.location.state.content),
            tags: (this.props.location.state.tags === undefined ? [] : this.props.location.state.tags),
            user: this.props.location.state.user,
            time: this.props.location.state.time,
            comments: this.props.location.state.comments,
            count: this.props.location.state.count,
            makeacomment: this.props.location.state.makeacomment,
            isRedirect: false,
            reportCount: this.props.location.state.reportCount,
            likeCount: this.props.location.state.likeCount,
            upvoteCount: this.props.location.state.upvoteCount,
            downvoteCount: this.props.location.state.downvoteCount,
            reportArray: this.props.location.state.reportArray,
            likeArray: this.props.location.state.likeArray,
            upvoteArray: this.props.location.state.upvoteArray,
            downvoteArray: this.props.location.state.downvoteArray,
            //reportArraylimit: this.props.location.state.reportArraylimit,

            //CHANGE THIS
            followTags: (localStorage.getItem("tags") !== null) ? localStorage.getItem("tags").split(",") : [],
            //followTags: localStorage.getItem("tags").split(","),
            all: []
        };
        if(this.state.mode == "editpost") {
            console.log(this.state.mode)
            axios({
                method: 'get',
                url: "http://localhost:3000/api/getPostByID",
                params: {
                    id: this.state.id,   
                }
            })
            .then((response) => {
                console.log(response);
                this.setState({
                    title: response.data.data.title,
                    content: response.data.data.content,
                    user: response.data.data.user,
                    time: response.data.data.time,
                    tags: response.data.data.tag,   
                })
                console.log(this.state.title)
                console.log(this.state.content)
                console.log(this.state.tags)         
            })
            .catch((error) => {
                    console.log(error);
            });
        }
        
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
    

        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.handleUpdatePost = this.handleUpdatePost.bind(this);
        this.handleCurveChange = this.handleCurveChange.bind(this);
        this.handleChangeTae = this.handleChangeTae.bind(this);
    }

    handleChangeContent(event) {
        this.setState(
            {
                type: this.state.type,
                title: this.state.title,
                content: event.target.value,
                tags: this.state.tags,
               
            },
            () => {
                // This will output an array of objects
                // given by Autocompelte options property.
                console.log(this.state.tags);
              }
        );
    }

    handleChangeTags(event, values) {
        console.log(event.target.value)
      
      if(event.target.value === 0 || this.state.all.includes(event.target.value) || event.target.value == null) {
        this.setState(
            {
                type:this.state.type,
                title: this.state.title,
                content: this.state.content,
                tags: values,
            },
            () => {
                // This will output an array of objects
                // given by Autocompelte options property.
                console.log(this.state.tags);
              }
        );
       }
       else if(!this.state.all.includes(event.target.value) && event.target.value != null) {
            //alert("Tag doesn't exist");
            
            this.renderSet("Tag doesn't exist!", "error");
            values.pop()
        }
    }

    handleChangeTae(event) {
        this.setState(
            {
                type:this.state.type,
                title: this.state.title,
                content: this.state.content,
                tags: event.target.value.replace(" ", "").split(",")
            }
        );
    }

    handleCurveChange(event) {

        let name = event.target.name;
        let curves = this.state.tags;
        if (name === "bound_A") {
            curves[0] = event.target.value;
        } else if (name === "bound_B") {
            curves[1] = event.target.value;
        } else if (name === "bound_C") {
            curves[2] = event.target.value;
        } else if (name === "bound_D") {
            curves[3] = event.target.value;
        }

        this.setState(
            {
                type: this.state.type,
                title: this.state.title,
                content: this.state.content,
                tags: curves
            }
        );
    }

    handleCreatePost(event) {
        // This is to stop the default behavior, 
        // which in this case is stopping form from reloading itself
        event.preventDefault();

        // Check if input is empty
        if (this.state.type !== "grade" && this.state.type !== "curve") {
            if (this.state.title.length === 0) {
                //alert('Title cannot be empty');
                this.renderSet("Title cannot be empty!", "error");
                return;
            } else if (this.state.content.length === 0) {
                //alert('Content cannot be empty');
                this.renderSet("Content cannot be empty!", "error");
                return;
            } else if (this.state.tags.length === 0 || this.state.tags[0] === "") {
                //alert('Tags cannot be empty');
                this.renderSet("Tags cannot be empty!", "error");
                return;
            }
        }
        let count = 0;

        for(let i = 0; i < this.state.tags.length; i++) {
            if(this.state.followTags.includes(this.state.tags[i])) {
                count++;
            }
        }
        if(count == 0 && (this.state.type !== "grade" && this.state.type !== "curve")) {
            //alert('You must include atleast one tag that you follow');
            this.renderSet("You must include atleast one tag that you follow!", "error");
            return;
        }
        
        console.log(this.tags);

        let username = localStorage.getItem("username");
        if (!username) {
            username = "johndoe";
        }

        let requestUrl = 'http://localhost:3000/api/';
        // Send request differently for grade inputs
        if (this.state.type === "grade") {
            // check for content validity
            if (this.state.title.length === 0) {
                //alert('Course name cannot be empty');
                this.renderSet("Course name cannot be empty!", "error");
                return;
            } else if (isNaN(this.state.content)) {
                //alert('Please input a number for score');
                this.renderSet("Please input a number for score!", "error");
                return;
            } else if (this.state.content <= 0 || this.state.content >= 100) {
                //alert('Please input a valid number for score');
                this.renderSet("Please input a valid number for score!", "error");                
                return;
            } else if (
                this.state.tags[0] !== 'A' &&
                this.state.tags[0] !== 'B' &&
                this.state.tags[0] !== 'C' &&
                this.state.tags[0] !== 'D' &&
                this.state.tags[0] !== 'F'
            ) {
                //alert('Please input a valid grade of A,B,C,D or F');
                this.renderSet("Please input a valid grade of A,B,C,D or F!", "error"); 
                return;
            }

            requestUrl = requestUrl + "creategrade";
        }
        // request for curve inputs
        else if (this.state.type === "curve") {
            // error checking for curve input
            if (this.state.title.length === 0) {
                //alert('Course name cannot be empty');                
                this.renderSet("Course name cannot be empty!", "error");
                return;
            } else if (this.state.tags.length != 4) {
                //alert('Some curve data is missing');
                this.renderSet("Some curve data is missing!", "error");
                return;
            } else if (this.state.tags[0] > 100) {
                //alert('The lower bound of A cannot be more than 100');
                this.renderSet("The lower bound of A cannot be more than 100!", "error");
                return;
            } else if (this.state.tags[3] < 0) {
                //alert('The lower bound of D cannot be less than 0');
                this.renderSet("The lower bound of D cannot be less than 0!", "error");
                return;
            } else if (!(this.state.tags[0] > this.state.tags[1] &&
                       this.state.tags[1] > this.state.tags[2] &&
                       this.state.tags[2] > this.state.tags[3])) {
                //alert('The input data is invalid. Check the order');
                this.renderSet("The input data is invalid. Check the order!", "error");
                return;
            }

            requestUrl = requestUrl + "createcurve";
        }
        // request for any other posts
        else {
            requestUrl = requestUrl + "createpost";
        }

        // Send request to the database
        axios({
            method: 'post',
            url: requestUrl,
            data: {
                title: this.state.title,
                user: username,
                type: this.state.type,
                tag: this.state.tags,
                count: 0,
                comments: [],
                content: this.state.content,
                time: new Date().getTime(),
                reportCount: 0,
                likeCount: 0,
                upvoteCount: 0,
                downvoteCount: 0,
                reportArray: [],
                likeArray: [],
                upvoteArray: [],
                downvoteArray: [],
                //reportArraylimit: 1,
                
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({
                type: this.state.type,
                title: this.state.title,
                content: this.state.content,
                tags: this.state.tags,
                isRedirect: true
            });
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }

    handleChangeTitle(event) {
        this.setState(
            {
                type: this.state.type,
                title: event.target.value,
                content: this.state.content,
                tags: this.state.tags,
            }
        );
    }

    handleUpdatePost(event) {
        // This is to stop the default behavior, 
        // which in this case is stopping form from reloading itself
        event.preventDefault();

        // Check if input is empty
        if (this.state.tags.length === 0) {
            alert('Tags cannot be empty');
            return;
        } else if (this.state.title.length === 0 ) {
            alert('Title cannot be empty');
            return;
        } else if (this.state.content.length === 0) {
            alert('Content cannot be empty');
            return;
        }

        let count = 0;

        for(let i = 0; i < this.state.tags.length; i++) {
            if(this.state.followTags.includes(this.state.tags[i])) {
                count++;
            }
        }
        if(count == 0) {
            alert('You must include atleast one tag that you follow')
            return;
        }
        
        let username = localStorage.getItem("username");
        if (!username) {
            username = "johndoe";
        }

        // Send request to the database
        axios({
            method: 'put',
            url: 'http://localhost:3000/api/updatepost',
            data: {
                title: this.state.title,
                user: username,
                type: this.state.type,
                tag: this.state.tags,
                count: 0,
                comments: [],
                content: this.state.content,
                time: this.state.time
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({
                type: this.state.type,
                title: this.state.title,
                content: this.state.content,
                tags: this.state.tags,
                isRedirect: true
            });
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }
    

    getTextPage = () => {
        return (
            <ThemeProvider theme={theme}>
            <div>
                {this.renderAlert()}
                <TopBar />

                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleCreatePost}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center" >
                            <Grid item>
                                <ResponsiveDrawer />
                            </Grid>
                            <Box
                                boxShadow={0}
                                margin={1}
                                width="50%"
                                mt={20} >
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center" >
                                        <ThemeProvider theme={theme}>
                                            
                                                <h3 style={{ color: '#F2B705' }}>
                                                    Post Title
                                                </h3>
                                           
                                            
                                            <br/>
                                                <TextField data-testid="post-title" id="filled-basic" label="Post Title" variant="filled" size="medium" onChange={this.handleChangeTitle} value={this.state.title}/>
                                            
                                            
                                                <br />
                                                <h3 style={{ color: '#F2B705' }}>
                                                    Post Content
                                                </h3>
                                            
                                                <TextField data-testid="post-content" id="filled-basic" label="Post Content" variant="filled" onChange={this.handleChangeContent} value={this.state.content}/>
                                            
                                                <h3 style={{ color: '#F2B705' }}>
                                                    Tags
                                                </h3>
                                           
                            
                                            <div style={{ width: 300 }}>
                                                
                                                <Autocomplete
                                                    multiple
                                                    id="tags-standard"
                                                    options={this.state.followTags}
                                                    data-testid="post-tags"
                                                    onChange={this.handleChangeTags}
                                                    freeSolo
                                                    value={this.state.tags}
                                                    renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Tags"
                                                        // placeholder="Favorites"
                                                        margin ="normal"
                                                        fullWidth
                                                    />
                                                    )}
                                                />
                                            </div>
                                            
                                            <br/>
                                            <Grid
                                            
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center" >
                                                    <Button

                                                        data-testid="post-submit"
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{ justifyContent: 'center' }}
                                                        disableElevation
                                                        type="button"
                                                        onClick={this.state.mode === "editpost" ? this.handleUpdatePost : this.handleCreatePost} >
                                                        MAKE POST
                                                    </Button>
                                            </Grid>
                                            
                                        </ThemeProvider>
                                </Grid>
                            </Box>
                        </Grid>
                    </form>
                </div>
                
            </div>
            </ThemeProvider>
        );
    }

    getImagePage = () => {
        return (
            <ThemeProvider theme={theme}>
            <div>
                {this.renderAlert()}
                <TopBar />

                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleCreatePost}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center" >
                                <Grid item>
                                <ResponsiveDrawer />
                            </Grid>
                            <Box
                                boxShadow={30}
                                margin={1}
                                width="50%"
                                mt={20} >
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center" >
                                        <ThemeProvider theme={theme}>
                                           
                                                <h3 style={{ color: '#F2B705' }}>
                                                    Post Title
                                                </h3>
                                                <br/>
                                                <TextField data-testid="post-title" id="filled-basic" label="Post Title" variant="filled" size="medium" onChange={this.handleChangeTitle}  value={this.state.title}/>
                                        
                                            <br />
                                            <h3 style={{ color: '#F2B705' }}>
                                                Post Image URL
                                            </h3>
                                            <br />
                                            <TextField data-testid="post-image" id="filled-basic" label="Post Image URL" variant="filled" onChange={this.handleChangeContent}  value={this.state.content}/>
                                            <br />
                                            <h3 style={{ color: '#F2B705' }}>
                                                Tags
                                            </h3>
                                            
                                            <div style={{ width: 300 }}>
                                                <Autocomplete
                                                    multiple
                                                    id="tags-standard"
                                                    options={this.state.followTags}
                                                    data-testid="post-tags"
                                                    onChange={this.handleChangeTags}
                                                    freeSolo
                                                    value={this.state.tags}
                                                    renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Tags"
                                                        // placeholder="Favorites"
                                                        margin ="normal"
                                                        fullWidth
                                                    />
                                                    )}
                                                />
                                                <br/>
                                            </div>
                                            <Grid
                                                
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center" >
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{ justifyContent: 'center' }}
                                                        disableElevation
                                                        data-testid="post-submit"
                                                        type="button"
                                                        onClick={this.state.mode === "editpost" ? this.handleUpdatePost : this.handleCreatePost} >
                                                        MAKE POST
                                                    </Button>
                                            </Grid>
                                        </ThemeProvider>
                                </Grid>
                            </Box>
                        </Grid>
                    </form>
                </div>
            </div>
            </ThemeProvider>
        );
    }

   
    getGradeInputPage = () => {
        return (
            <ThemeProvider theme={theme}>
            <div>
                {this.renderAlert()}
                <TopBar />
                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleCreatePost}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center" >
                                <Grid item>
                                <ResponsiveDrawer />
                            </Grid>
                            <Box
                                boxShadow={30}
                                margin={1}
                                width="50%"
                                mt={20} >
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center" >
                                        <ThemeProvider theme={theme}>
                                            <h3 style={{ color: '#F2B705' }}>
                                                Course Name
                                            </h3>
                                            <br/>
                                            <TextField data-testid="post-coursename" id="filled-basic" label="" variant="filled" size="medium" onChange={this.handleChangeTitle}  value={this.state.title}/>
                                            <br />
                                            <h3 style={{ color: '#F2B705' }}>
                                                Score (in percentage)
                                            </h3>
                                            <br />
                                            <TextField data-testid="post-coursescore" id="filled-basic" label="" variant="outlined" onChange={this.handleChangeContent}  value={this.state.content}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }}
                                            />
                                            <br />
                                            <h3 style={{ color: '#F2B705' }}>
                                                Grade (A ~ F)
                                            </h3>
                                            <br />
                                            <TextField data-testid="post-coursegrade" id="filled-basic" label="" variant="filled" onChange={this.handleChangeTae} value={this.state.tags.toString()} />
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center" >
                                                    <Button
                                                        data-testid="post-submit"
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{ justifyContent: 'center' }}
                                                        disableElevation
                                                        type="button"
                                                        onClick={this.state.mode === "editpost" ? this.handleUpdatePost : this.handleCreatePost} >
                                                        MAKE POST
                                                    </Button>
                                            </Grid>
                                        </ThemeProvider>
                                </Grid>
                            </Box>
                        </Grid>
                    </form>
                </div>
            </div>
            </ThemeProvider>
        );
    }

    getCurveInputPage = () => {
        return (
            <ThemeProvider theme={theme}>
            <div>
                {this.renderAlert()}
                <TopBar />
                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleCreatePost}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center" >
                            <Grid item>
                                <ResponsiveDrawer />
                            </Grid>
                            <Box
                                boxShadow={30}
                                margin={1}
                                width="50%"
                                mt={20} >
                                     <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center" >
                                        <ThemeProvider theme={theme}>
                                            <h3 style={{ color: '#F2B705' }}>
                                                Course Name
                                            </h3>
                                            <br/>
                                            <TextField data-testid="post-coursename" id="filled-basic" label="" variant="filled" size="medium" onChange={this.handleChangeTitle}  value={this.state.title}/>
                                            <br />
                                            <h3 style={{ color: '#F2B705' }}>
                                                Curve (lower bound)
                                            </h3>
                                            <br />
                                            <TextField data-testid="post-bound-A" name="bound_A" id="filled-basic" label="" variant="outlined" onChange={this.handleCurveChange}  value={this.state.content}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">A%</InputAdornment>
                                            }}
                                            />
                                            <br />
                                            <TextField data-testid="post-bound-B" name="bound_B" id="filled-basic" label="" variant="outlined" onChange={this.handleCurveChange}  value={this.state.content}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">B%</InputAdornment>
                                            }}
                                            />
                                            <br />
                                            <TextField data-testid="post-bound-C" name="bound_C" id="filled-basic" label="" variant="outlined" onChange={this.handleCurveChange}  value={this.state.content}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">C%</InputAdornment>
                                            }}
                                            />
                                            <br />
                                            <TextField data-testid="post-bound-D" name="bound_D" id="filled-basic" label="" variant="outlined" onChange={this.handleCurveChange}  value={this.state.content}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">D%</InputAdornment>
                                            }}
                                            />
                                            <br/>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center" >
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        data-testid="post-submit"
                                                        style={{ justifyContent: 'center' }}
                                                        disableElevation
                                                        type="button"
                                                        onClick={this.state.mode === "editpost" ? this.handleUpdatePost : this.handleCreatePost} >
                                                        MAKE POST
                                                    </Button>
                                            </Grid>
                                        </ThemeProvider>
                                </Grid>
                            </Box>
                        </Grid>
                    </form>
                </div>
            </div>
            </ThemeProvider>
        );
    }

    getCalendarPage = () => {
        return (
            <ThemeProvider theme={theme}>
            <div>
                {this.renderAlert()}
                <TopBar />

                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleCreatePost}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center" >
                            <Grid item>
                                <ResponsiveDrawer />
                            </Grid>
                            <Box
                                boxShadow={0}
                                margin={1}
                                width="50%"
                                mt={20} >
                                <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center" >
                                        <ThemeProvider theme={theme}>
                                            <h3 style={{ color: '#F2B705' }}>
                                                Post Title
                                            </h3>
                                            <br/>
                                            <TextField id="filled-basic" label="Post Title" variant="filled" size="medium" onChange={this.handleChangeTitle} value={this.state.title}/>
                                            <br />
                                            <h3 style={{ color: '#F2B705' }}>
                                                Post Content
                                            </h3>
                                            
                                            <TextField id="filled-basic" label="Ask for feedback" variant="filled" onChange={this.handleChangeContent} value={this.state.content}/>
                                            <h3 style={{ color: '#F2B705' }}>
                                                COURSES
                                            </h3>
                            
                                            <div style={{ width: 300 }}>
                                                <Autocomplete
                                                    multiple
                                                    id="tags-standard"
                                                    options={this.state.all}

                                                    onChange={this.handleChangeTags}
                                                    freeSolo
                                                    value={this.state.tags}
                                                    renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Courses"
                                                        // placeholder="Favorites"
                                                        margin ="normal"
                                                        fullWidth
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <br/>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center" >
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{ justifyContent: 'center' }}
                                                        disableElevation
                                                        type="button"
                                                        onClick={this.state.mode === "editpost" ? this.handleUpdatePost : this.handleCreatePost} >
                                                        MAKE POST
                                                    </Button>
                                            </Grid>
                                        </ThemeProvider>
                                </Grid>
                            </Box>
                        </Grid>
                    </form>
                </div>
            </div>
            </ThemeProvider>
        );
    }

    getLinkPage = () => {
        return (
            <ThemeProvider theme={theme}>
            <div>
                {this.renderAlert()}
                <TopBar />

                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleCreatePost}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center" >
                            <Grid item>
                                <ResponsiveDrawer />
                            </Grid>
                            <Box
                                boxShadow={0}
                                margin={1}
                                width="50%"
                                mt={20} >
                                <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center" >
                                        <ThemeProvider theme={theme}>
                                            <h3 style={{ color: '#F2B705' }}>
                                                Post Title
                                            </h3>
                                            <br/>
                                            <TextField id="filled-basic" label="Post Title" variant="filled" size="medium" onChange={this.handleChangeTitle} value={this.state.title}/>
                                            <br />
                                            <h3 style={{ color: '#F2B705' }}>
                                                Link
                                            </h3>
                                            
                                            <TextField id="filled-basic" label="Post Content" variant="filled" onChange={this.handleChangeContent} value={this.state.content}/>
                                            <h3 style={{ color: '#F2B705' }}>
                                                Tags
                                            </h3>
                            
                                            <div style={{ width: 300 }}>
                                                <Autocomplete
                                                    multiple
                                                    id="tags-standard"
                                                    options={this.state.followTags}

                                                    onChange={this.handleChangeTags}
                                                    freeSolo
                                                    value={this.state.tags}
                                                    renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Tags"
                                                        // placeholder="Favorites"
                                                        margin ="normal"
                                                        fullWidth
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <br/>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center" >
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{ justifyContent: 'center' }}
                                                        disableElevation
                                                        type="button"
                                                        onClick={this.state.mode === "editpost" ? this.handleUpdatePost : this.handleCreatePost} >
                                                        MAKE POST
                                                    </Button>
                                            </Grid>
                                        </ThemeProvider>
                                </Grid>
                            </Box>
                        </Grid>
                    </form>
                </div>
            </div>
            </ThemeProvider>
        );
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

    render() {

        if (this.state.isRedirect) {
            return <Redirect exact from="/createpost" push to={{
                pathname: "/mp"
            }}/>;
        }

        if (this.state.type === "text") {
            return this.getTextPage();
        }
        if (this.state.type === "image") {
            return this.getImagePage();
        }
        if (this.state.type === "grade") {
            return this.getGradeInputPage();
        }
        if (this.state.type === "curve") {
            return this.getCurveInputPage();
        }
        if (this.state.type === "calendar") {
            return this.getCalendarPage();
        }
        if (this.state.type === "link") {
            return this.getLinkPage();
        }
    }
}

