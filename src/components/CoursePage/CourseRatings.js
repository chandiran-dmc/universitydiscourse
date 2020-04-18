/**
 * This is a React component for the ratings in the 
 */

import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import axios from 'axios';

export default class CourseRatings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coursename: props.coursename,
            updateRatings: props.update,
            ratings: props.ratings,
            value: 0,
            isRated: false
        };
    }

    /**
     * Check if the user has already submitted a rating for this course
     */
    componentDidUpdate() {

        let username = localStorage.getItem("username");
        let ratings = this.state.ratings;

        // go through all the ratings and search for the user
        for (let i = 0; i < ratings.length; i++) {

            // if found, update the value with the given value
            // and set the isRated as true
            if (ratings[i].username === username) {
                this.setState({
                    value: ratings[i].rating,
                    isRated: true
                });
                break;
            }
        }

        console.log(this.state.ratings);
    }

    /**
     * Method to create a new rating to the database
     */
    createNewRating = (event) => {
        console.log("Current value: " + this.state.value);

        // send request to server
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/createrating',
            data: {
                course: this.state.coursename,
                username: localStorage.getItem("username"),
                rating: this.state.value
            }
        })
        .then((response) => {
            
            // set as rated
            this.setState({
                isRated: true
            });

            // update the average ratings
            this.state.updateRatings();
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }

    render() {
        return (
            <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
            >
                <Grid item>
                    {this.state.isRated ? 
                        <Rating 
                            readOnly
                            precision={0.5}
                            value={this.state.value}
                        />
                        :
                        <Rating 
                            name="your rating"
                            precision={0.5}
                            value={this.state.value}
                            onChange={(event, value) => {
                                this.setState({
                                    value: value
                                });
                            }}
                        />
                    }
                </Grid>
                <Grid item>
                    {this.state.isRated ?
                        <Button
                            variant="contained"
                            disabled
                        >
                            Submit
                        </Button>
                        :
                        <Button
                            variant="contained"
                            onClick={this.createNewRating}
                        >
                            Submit
                        </Button>
                    }
                </Grid>

            </Grid>
        )
    }
}
