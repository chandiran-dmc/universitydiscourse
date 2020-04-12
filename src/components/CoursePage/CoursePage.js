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
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, createMuiTheme, ThemeProvider, Divider } from '@material-ui/core';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2B705"
        },
        secondary: {
            main: "#F2C94C"
        },
        text: {
            main: "#000000",
            sub: "#9B9B9B"
        }
    }
});

export default class CoursePage extends Component {

    constructor(props) {
        // get the course name from url
        super(props);
        var location = window.location.href;
        var result = location.substring(location.lastIndexOf("/") + 1);
        var pos = result.indexOf('?');
        if ( pos < 0 ) pos = result.length;
        result = result.substring(0, pos);

        this.state = {
            id: result,
            selectedFile: null,
           
        };
    }

    /**
     * List of functions to execute to update/show to user
     */
    componentDidMount() {
        // Get grade graph and display it
        this.showGraph(this.state.id);

        // Get the course information through purdue io api

        // Check if the user is currently following this tag (course)
        // if so, change to unfollow button
        // if not, enable the follow button with correct callback function
        this.checkFollowing(this.state.id);
    }

    onChangeHandler=event=>{

        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
        })
    
    }
    
    /**
     * This method checks the local storage to see if the user follows the current course
     * and handles the result
     */
    checkFollowing = (tag) => { 
        let followingTags = localStorage.getItem("tags");
        // set empty array if item non existant
        if (followingTags == null) {
            followingTags = [];
        } else {
            // get the tags in an array
            followingTags = followingTags.split(",");
        }

        // unfollow button
        if (followingTags.includes(tag)) {
            this.setState({
                followButton: 
                <Button
                    variant="contained"
                    color="primary"
                    style={{width : "100%"}}
                    onClick={this.unfollowTag}
                >
                    Unfollow
                </Button>
            });
        } else {
            // set the appropriate callback function
            this.setState({
                followButton: 
                <Button
                    variant="contained"
                    color="primary"
                    style={{width : "100%"}}
                    onClick={this.followTag}
                >
                    Follow
                </Button>
            });
        }
    }

    /**
     * This method is called when the user clicks an unfollow tag button
     */
    unfollowTag = () => {
        let tag = this.state.id;

        // request server for update on user

        // update local storage

        // change button to follow
        this.setState({
            followButton: 
            <Button
                variant="contained"
                color="primary"
                style={{width : "100%"}}
                onClick={this.followTag}
            >
                Follow
            </Button>
        });        

        // show alert to the user to notify that the process is done
    }


    /**
     * This method is called when the user clicks an enabled follow tag button
     */
    followTag = () => {
        let tag = this.state.id;
        
        // request server for update on user

        // update local storage

        // change button to unfollow
        this.setState({
            followButton: 
            <Button
                variant="contained"
                color="primary"
                style={{width : "100%"}}
                onClick={this.unfollowTag}
            >
                Unfollow
            </Button>
        });
        
        // show alert to the user to notify that the process is done
    }

    /**
     * This method gets data using the purdue.io API for course information
     */
    getCourseInfo = async (tag) => {

    }

    /**
     * This method pulls data from the server and displays the grade
     */
    showGraph = async (tag) => {

        // curve (D, C, B, A)
        let defaultCurves = [90, 80, 75, 70];

        // sample grade occurence (A: 21%, B: 36%, C: 25%, D: 14%, F: 4%)
        // based on 100 students
        let occurences = [21, 36, 25, 14, 4];

        // query the database for curves
        let curves = [];
        await axios({
            method: 'get',
            url: 'http://localhost:3000/api/getcurves'
        }).then(response => {
            let temp = response.data.data;
            // filter the curves so that we only get the curves for the current tag
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].course === this.state.id) {
                    curves.push(temp[i]);
                }
            }
        }).catch(error => {
            console.error(error);
        });

        // query the database for grades only if there is no curves
        let grades = [];
        if (curves.length === 0) {
            await axios({
                method: 'get',
                url: 'http://localhost:3000/api/getgrades'
            }).then(response => {
                let temp = response.data.data;
                // filter the curves so that we only get the curves for the current tag
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i].course === this.state.id) {
                        grades.push(temp[i]);
                    }
                }
            }).catch(error => {
                console.error(error);
            });
        }

        // the priority of data is "curves" > "grades" > "default"
        if (curves.length !== 0) {
            // get the average of each curve
            // average for A
            for (let i = 0; i < curves.length; i++) {
                defaultCurves[0] += Number(curves[i].bound_a);
            }
            defaultCurves[0] = defaultCurves[0] / (curves.length + 1);
            // average for B
            for (let i = 0; i < curves.length; i++) {
                defaultCurves[1] += Number(curves[i].bound_b);
            }
            defaultCurves[1] = defaultCurves[1] / (curves.length + 1);
            // average for C
            for (let i = 0; i < curves.length; i++) {
                defaultCurves[2] += Number(curves[i].bound_c);
            }
            defaultCurves[2] = defaultCurves[2] / (curves.length + 1);
            // average for D
            for (let i = 0; i < curves.length; i++) {
                defaultCurves[3] += Number(curves[i].bound_d);
            }
            defaultCurves[3] = defaultCurves[3] / (curves.length + 1);

        } else if (grades.length !== 0) {
            for (let i = 0; i < grades.length; i++) {

                // increment the occurence based on grade
                switch (grades[i].grade) {
                    case "A":
                        occurences[0]++;
                        break;
                
                    case "B":
                        occurences[1]++;
                        break;

                    case "C":
                        occurences[2]++;
                        break;

                    case "D":
                        occurences[3]++;
                        break;

                    case "F":
                        occurences[4]++;
                        break;
                }
            }
        }

        // set options for the chart react component
        const state = {
            labels: ["A >" + defaultCurves[0], "B >" + defaultCurves[1], "C >" + defaultCurves[2], "D >" + defaultCurves[3], "F"],
            datasets: [
                {
                    label: "",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: occurences,
                    pointRadius: 2,
                }
            ]
        };

        const option = {
            legend: {
                display: false
            },
            maintainAspectRatio: false,
        };
        // set grade graph
        this.setState({
            graph: 
                <Line
                    data={state}
                    options={option}
                    height={200}
                />,
        });
    }
    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3001/api/user-profile", data, {
        }).then(res => {
            console.log(res)
        })
        console.log(data);
    }   

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                >
                    <Grid
                        item
                        style={{width : "80%"}}
                    >
                        <Card>
                            <CardMedia 
                                image="https://images.pexels.com/photos/1781709/pexels-photo-1781709.jpeg"
                                style={{paddingTop: '15%'}}
                            />
                            <CardContent>
                                <Typography
                                    variant="h4"
                                >
                                    {this.state.id}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                >
                                    {this.state.title}
                                </Typography>
                                <br/>
                                <Typography
                                    variant="body1"
                                >
                                    Credit Hours: {this.state.credit}.00
                                </Typography>
                                <Typography
                                    variant="body1"
                                >
                                    {this.state.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {this.state.followButton}
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        style={{width: "80%", marginTop: "3%"}}
                    >
                        <Typography
                            variant="h5"
                            align="center"
                        >
                            Grade Distribution Graph
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        style={{width: "80%"}}
                    >
                        {this.state.graph}
                    </Grid>
                </Grid>
            </ThemeProvider>
            
        )
    }
 }


