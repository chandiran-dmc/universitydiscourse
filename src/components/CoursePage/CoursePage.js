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
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, createMuiTheme, ThemeProvider, Divider, Paper } from '@material-ui/core';
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
            graph: <div/>,
            title: "Defualt course title",
            description: "No course description available",
            credit: 0,
            followButton: <div/>
        };
    }

    /**
     * List of functions to execute to update/show to user
     */
    componentDidMount() {
        // Get grade graph and display it
        this.showGraph(this.state.id);

        // Get the course information through purdue io api
        this.getCourseInfo(this.state.id);

        // Check if the user is currently following this tag (course)
        // if so, change to unfollow button
        // if not, enable the follow button with correct callback function
        this.checkFollowing(this.state.id);
    }
    
    /**
     * This method checks the local storage to see if the user follows the current course
     * and handles the result
     * 
     * @param  tag  the course name
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
        let tagName = this.state.id;

        if (window.confirm('Remove tag ' + tagName + ' ?')) {

            // cannot remove default tag manually
            if (tagName === "default") {
                alert('Cannot remove default tag');
                return;
            }

            let tags = localStorage.getItem("tags").split(",");
            // remove the tag from the local storage
            tags = tags.filter((value, index, arr) => {return value !== tagName});
            if (tags.length === 0) {
                localStorage.removeItem("tags");
            }
            else {
                // update the local storage
                localStorage.setItem("tags", tags.toString());
            }

            // update database
            axios({
                method: 'post',
                url: 'http://localhost:3000/api-user/updateusertags',
                data: {
                    email: localStorage.getItem("email"),
                    newtags: (tags.length === 0 ? "default" : tags.toString())
                }
            })
            .then((response) => {
                console.log("Tags updated");
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
            })
            .catch((error) => {
                console.error(error.response);
                if (error.response.data.message) {
                    alert(error.response.data.message);
                }
            });
        }
    }

    /**
     * This method is called when the user clicks an enabled follow tag button
     */
    followTag = () => {
        let tag = this.state.id;
        let tags = [];
        if (localStorage.getItem("tags") != null) {
            tags = localStorage.getItem("tags").split(",");
            // Remove default tag
            tags = tags.filter((value, index, arr) => {return value !== "default"});
        }
        // update local storage
        // handling duplicate tags
        if (tags.includes(tag)) {
            alert(`Tag ${tag} is already being followed.`);
            return;
        } else {
            tags.push(tag);
        }
        localStorage.setItem("tags", tags.toString());

        // update database
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/updateusertags',
            data: {
                email: localStorage.getItem("email"),
                newtags: tags.toString()
            }
        })
        .then((response) => {
            console.log("Tags updated");
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
        })
        .catch((error) => {
            console.error(error.response);
            if (error.response.data.message) {
                alert(error.response.data.message);
            }
        });
    }

    /**
     * This method gets data using the purdue.io API for course information
     * For more information, check https://github.com/Purdue-io/PurdueApi 
     * 
     * @param  tag  course name
     */
    getCourseInfo = async (tag) => {

        // the 'CS' part of the course name
        let result = this.getAbbrevAndNum(tag);
        let abbreviation = result.abbreviation;
        let number = result.number;

        // make the request to Purdue.io with the following url
        let url = "http://api.purdue.io/odata/Courses?%24filter=Subject/Abbreviation eq '" 
                    + abbreviation + "' and Number eq '" + number + "'";

        // request
        await axios({
            method: 'get',
            url: url
        }).then((response) => {
            let queryResult = response.data.value[0];
            this.setState({
                title: queryResult.Title,
                description: (queryResult.Description === "" ? "No course description available" : queryResult.Description),
                credit: queryResult.CreditHours,
            });
        }).catch((error) => {
            console.error(error);
            alert("error while fetching course information");
        });
    }

    /**
     * This is a helper function to extract the abbreviation (ex: 'CS')
     * and the course number (ex: '18000') from the given course name
     * 
     * @param  tag  the course name (ex: CS307)
     * @returns an object with abbreviation and number extracted from the tag
     */
    getAbbrevAndNum = (tag) => {

        // get abbreviation by matching with regex
        let found = tag.match(/[A-Za-z]+/g);
        found = found[0];

        // get course number
        let number = tag.match(/[0-9]+/g);
        number = number[0] + "";
        // add additional 0s to the number for correct querying
        let numLength = 5 - number.length;
        for (let i = 0; i < numLength; i++) {
            number += "0";
        }

        return {
            abbreviation: found,
            number: number
        };
    }

    /**
     * This method pulls data from the server and displays the grade
     * by updating the state of graph with a react-chart-js component
     * 
     * @param  tag  the course name
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
                        style={{
                            width: "80%",
                            marginTop: "20px"
                        }}
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            style={{
                                background: "#F2F2F2"
                            }}
                        >
                            <Typography
                                variant="h5"
                                align="center"
                                style={{
                                    paddingTop: "20px"
                                }}
                            >
                                Ratings
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        style={{
                            width: "80%",
                            marginTop: "20px",
                        }}
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            style={{
                                background: "#F2F2F2"
                            }}
                        >
                            <Typography
                                variant="h5"
                                align="center"
                                style={{
                                    paddingTop: "20px"
                                }}
                            >
                                Grade Distribution Graph
                            </Typography>
                            {this.state.graph}
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        style={{
                            width: "80%",
                            marginTop: "20px"
                        }}
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            style={{
                                background: "#F2F2F2"
                            }}
                        >
                            <Typography
                                variant="h5"
                                align="center"
                                style={{
                                    paddingTop: "20px"
                                }}
                            >
                                Documents
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </ThemeProvider>
            
        );
    }
 }


