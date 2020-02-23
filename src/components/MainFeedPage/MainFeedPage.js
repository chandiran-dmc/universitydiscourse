/**
 * This page is the main feed page
 * The user should arrive to this page after logging in,
 * clicking on the university discourse icon, etc.
 * 
 * This page should consist of:
 * - top bar = search bar, user profile image button, etc. 
 * - action bar = a bar that includes buttons to create post,
 *                filter posts, etc.
 * - posts from the tags that the user follows
 * - tags that the user follows
 */

import React, { Component } from 'react'
import TopBar from '../TopBar';
import ActionBar from './ActionBar';
import Post from './../Post';
import FollowingTags from './FollowingTags';
import { Grid } from '@material-ui/core';
import './MainFeedPage.css'

export default class MainFeedPage extends Component {

    render() {

        /**
         * TODO: get all the posts here before return
         */
        let samplePost = {
            title: "hello", 
            content: "hello world", 
            user: "grr",
            time: 1582313744816,
            tags: ["cs240", "cs250"],
            comments: ["hello", "this is good"],
            type: "text",
            count: "10"
        };
        let sampleTags = [
            "cs307", "com217", "econ517"
        ];


        return (
            <div className="MainFeedPage">
                <Grid 
                    container
                    wrap="nowrap" 
                    spacing={4}
                    direction="row"
                    justify="center"
                    alignItems="flex-start" >
                    <TopBar />
                    <Grid item>
                        <Grid container
                        wrap="nowrap"
                        spacing={2}
                        direction="column">
                            <Grid item>
                                <ActionBar />
                            </Grid>
                            <Grid item>
                                <Post data={samplePost}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <FollowingTags tags={sampleTags}/>
                    </Grid>
                </Grid>

            </div>
        );
    }
}
