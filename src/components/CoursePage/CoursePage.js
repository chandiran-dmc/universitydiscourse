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
const axios = require('axios');

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
            selectedFile: null,
           
        };

        console.log(this.state.id)


               

    }

    onChangeHandler=event=>{

        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
        })
    
    }
    
    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3000/api-document/document-upload", data, {
        }).then(res => {
            console.log(res)
        })
        console.log(data);
    }   

    render() {
        return (
            <Grid>
                <Grid item>
                    {this.state.id}
                </Grid>
                <Grid item>
                    
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                    
                </Grid>
                <Grid item>
                    
                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>                     
                </Grid>
            </Grid>
        )
    }
 }


