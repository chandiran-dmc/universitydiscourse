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
import { Box, ThemeProvider, Grid, Avatar, Typography, Button, IconButton, createMuiTheme } from '@material-ui/core';
import MenuIcon from '../../customeIcons/menuIcon';
import LikeIcon from '../../customeIcons/likeIcon';
import {FacebookShareButton} from "react-share"
import FacebookIcon from '@material-ui/icons/Facebook';
import Post from './../Post';
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



export default class PostPage extends Component {

    constructor(props) {
        super(props);
        var location = window.location.href;
        var result = location.substring(location.lastIndexOf("/") + 1);
        var pos = result.indexOf('?');
        if ( pos < 0 ) pos = result.length;
        result = result.substring(0, pos);
        this.state = {
            id: result,
            type: "",
            mode: "",
            title: "",
            content: "",
            tags: [],
            user: "",
            time: "",
            comments: [],
            count: 0,
            user: "",
           
        };

        console.log(this.state.id)


        axios({
            method: 'get',
            url: "http://localhost:3000/api/getPostByID",
            params: {
                id: this.state.id,
                
            }
           
        })
        .then((response) => {
            let post = ""
            post = <Post key={Math.random()*100000} data={response.data.data} theme={theme}/>

            this.setState({
                post: post
            })
               
                console.log(post);
        })
        .catch((error) => {

                console.log(error);
        });

       

    }
    
   

    render() {
        return (
            <Grid>
                <Grid item>
                    {this.state.post}
                </Grid>
            </Grid>
        )
    }
 }


