/**
 * This is a react component for tag that will only be on for posts
 */

import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

export default class Tag extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            open: false,
            graph: <div/>
        };
    }

    followTag = (tag) => {
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
            // Close dialog
            this.closeDialog();
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
        })
        .catch((error) => {
            console.error(error.response);
            if (error.response.data.message) {
                alert(error.response.data.message);
            }
        });

        // Close dialog
        this.closeDialog();
    }

    toggleOpen = () => {
        this.setState({
            open: !this.state.open
        });
    }

    closeDialog = () => {
        this.setState({
            open: false
        });
    }

    /**
     * This method pulls data from the server and displays the grade
     */
    showGraph = (tag) => {
        
        // this is the base data of 500 students
        // following a mean value of 50
        let base = [];
        let samepleDataSize = 500;
        let variance = 5;
        let max = 160;
        for (let i = 0; i < samepleDataSize; i++) {
            let temp = 0;
            for (let j = 0; j < variance; j++) {
                temp += Math.random();
            }
            temp = temp / variance;

            // scale the value
            temp = temp * max;
            // round the number
            if (temp % 10 >= 5) {
                temp += 10 - (temp % 10);
            } else {
                temp -= (temp % 10);
            }
            base.push(temp);
        }
        // sort base data
        base.sort();

        // curve (D, C, B, A)
        let curves = [60, 70, 80, 90];

        // get occurence array
        let occurences = [];
        for (let i = 0; i < 5; i++) {
            occurences.push(0);
        }
        for (let i = 0; i < base.length; i++) {

            // A
            if (base[i] > curves[3]) {
                occurences[4]++;
            } else if (base[i] > curves[2]) {
                occurences[3]++;
            } else if (base[i] > curves[1]) {
                occurences[2]++;
            } else if (base[i] > curves[0]) {
                occurences[1]++;
            } else {
                occurences[0]++;
            }
            occurences[base[i]/10]++;
        }

        const state = {
            labels: ["F", "D", "C", "B", "A"],
            datasets: [
                {
                    label: "",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: occurences,
                    pointRadius: 0,
                }
            ]
        };
        
        this.setState({
            graph: <Line data={state}/>
        });
    }

    render() {
        return (
            <div>
                <Button
                    onClick={this.toggleOpen}
                    disableElevation
                    size="small" >
                    #{this.state.name}
                </Button>
                <Dialog
                open={this.state.open}
                onClose={this.closeDialog}
                >
                    <DialogTitle>
                        Tag Menu
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth
                            onClick={() => {this.followTag(this.state.name)}}
                        >
                            Follow {this.state.name}
                        </Button>
                    </DialogActions>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth
                            onClick={() => {this.showGraph(this.state.name)}}
                        >
                            View Course Graph
                        </Button>
                    </DialogActions>
                    {this.state.graph}
                </Dialog>
            </div>
        );
    }
    
}
