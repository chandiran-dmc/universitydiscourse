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
import Footer from '../Footer';
import ActionBar from './ActionBar';
import Post from './../Post';
import FollowingTags from './FollowingTags';
import { Grid } from '@material-ui/core';
import './MainFeedPage.css';

import sample_posts from '../../mock_data/post_data.json';
import sample_user from '../../mock_data/user_data.json';


export default class MainFeedPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            filteredPosts: [],
            user: {},
            tags: []
        };
    }

    /**
     * Helper function to get the posts for the user
     * Get all the posts from hot section and filter by
     * the tags the user follows
     */
    getPosts = () => {

        // TODO: request the database for the hot posts
        let posts = []
        posts = sample_posts; // XXX

        // TODO: Get user data from local file
        let user = sample_user; // XXX
        
        // Filter the posts based on the tags the user follows
        let tags = user.tags;
        let filteredPosts = [];
        posts.forEach((post) => {
            if (tags.includes(post.tag)) {
                filteredPosts.push(<div key={post.pid}><Post data={post}/></div>);
            }
        });

        console.log(filteredPosts)
        console.log(user.tags)

        this.setState({
            posts: sample_posts,
            filteredPosts: filteredPosts,
            user: user,
            tags: user.tags
        });

        console.log(this.state.tags)
    }

    componentDidMount = () => {
        this.getPosts();
    }

    render() {

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
                                {this.state.filteredPosts}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <FollowingTags tags={this.state.tags}/>
                    </Grid>
                </Grid>

            </div>
        );
    }
}
