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
import TopBar from '../TopBar/TopBar';
import './CreatePostPage.css'

export default class CreatePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(event) {
        // This is to stop the default behavior, 
        // which in this case is stopping form from reloading itself
        event.preventDefault();
        alert('Searching for ' + this.state.value);
    }
    
    

    handleChange(event) {
        this.setState(
            {
                value: event.target.value
            }
        );
    }

    

    render() {
        return (
            <div>
                <TopBar />
                <div className="CreatePostPage">
                    <form
                        onSubmit={this.handleSearch}>
                     <input
                        className = "Heading"
                        type="text"
                        value={this.state.value}
                        placeholder="Post Title..."
                        onChange={this.handleChange}
                    />
                    <input
                        className = "TextBox"
                        type="text"
                        value={this.state.value}
                        placeholder="Content..."
                        onChange={this.handleChange}
                    /> 
                    <input 
                        className="SubmitButton"
                        type="submit" 
                        value="Make Post" 
                    />


                    </form>


                </div>

                
            </div>
        )
    }
}
