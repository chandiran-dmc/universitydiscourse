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
            graph: <div/>,
            showingGraph: false
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
                if (temp[i].course === this.state.name) {
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
                    if (temp[i].course === this.state.name) {
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
        };
        // toggle grade graph
        if (this.state.showingGraph) {
            this.setState({
                graph: <div/>,
                showingGraph: false
            });
        } else {
            this.setState({
                graph: <Line data={state} options={option}/>,
                showingGraph: true
            });
        }
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
