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
import './MainFeedPage.css'

export default class MainFeedPage extends Component {

    onClickCreate() {
        alert('hi');
    }

    render() {
        return (
            <div>
                <TopBar />
                <Footer />
                <div className="MainFeedPage">
                    <div className="ActionBarContainer">
                        <ActionBar onClickCreate={this.onClickCreate}/>
                    </div>
                    <div className="PostsContainer">

                    </div>
                    <div className="FollowingTagsContainer">

                    </div>
                    
                </div>
            </div>
        )
    }
}
