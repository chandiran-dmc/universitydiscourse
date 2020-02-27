/**
 * This is a react component class for the action bar which
 * contains several buttons such as :
 * - 'Make a post'
 * - 'Text'
 * - 'Image'
 * - 'Document'
 * - 'Calendar'
 * - 'Link'
 * 
 * Please look at the UI mockup for image explanation
 */

 import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
 
 export default class ActionBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toCreatePostPage: false,
            type: null
        };
    }
    
     render() {

        // redirect to create post page
        if (this.state.toCreatePostPage) {
            return <Redirect to="../CreatePostPage" type={this.props.type}/>;
        }

         return (
             <div className="ActionBarButtonsContainer">
                 <button 
                    className="ActionBarButtonOdd"
                    id="CreatePostButton"
                    type="button" >
                    MAKE A POST
                 </button>
                 <button 
                    className="ActionBarButtonEven"
                    id="FilterTextButton"
                    type="button"
                    onClick={() => {this.setState(
                        {
                            toCreatePostPage: true, 
                            type: "text"
                        })}} >
                    TEXT
                 </button>
                 <button 
                    className="ActionBarButtonOdd"
                    id="FilterImageButton"
                    type="button"
                    onClick={() => {this.setState(
                        {
                            toCreatePostPage: true, 
                            type: "image"
                        })}} >
                    IMAGE
                 </button>
                 <button 
                    className="ActionBarButtonEven"
                    id="FilterDocumentButton"
                    type="button"
                    onClick={() => {this.setState(
                        {
                            toCreatePostPage: true, 
                            type: "document"
                        })}} >
                    DOCUMENT
                 </button>
                 <button 
                    className="ActionBarButtonOdd"
                    id="FilterCalendarButton"
                    type="button"
                    onClick={() => {this.setState(
                        {
                            toCreatePostPage: true, 
                            type: "calendar"
                        })}} >
                    CALENDAR
                 </button>
                 <button 
                    className="ActionBarButtonEven"
                    id="FilterLinkButton"
                    type="button"
                    onClick={() => {this.setState(
                        {
                            toCreatePostPage: true, 
                            type: "link"
                        })}} >
                    LINK
                 </button>
             </div>
         )
     }
 }
 