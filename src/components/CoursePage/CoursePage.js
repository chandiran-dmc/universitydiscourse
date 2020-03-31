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

import { Grid } from '@material-ui/core';


export default class CoursePage extends Component {

    constructor(props) {
        super(props);
        var location = window.location.href;
        var result = location.substring(location.lastIndexOf("/") + 1);
        var pos = result.indexOf('?');
        if ( pos < 0 ) pos = result.length;
        result = result.substring(0, pos);
        this.state = {
            id: result,
           
        };

        console.log(this.state.id)


               

    }
    
   

    render() {
        return (
            <Grid>
                <Grid item>
                    {this.state.id}
                </Grid>
            </Grid>
        )
    }
 }


