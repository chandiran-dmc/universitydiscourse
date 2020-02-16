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

 import React, { Component } from 'react'
 import createPostButton from '../../images/createPostButton.svg'
 
 export default class ActionBar extends Component {
     render() {
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
                    type="button" >
                    TEXT
                 </button>
                 <button 
                    className="ActionBarButtonOdd"
                    id="FilterImageButton"
                    type="button" >
                    IMAGE
                 </button>
                 <button 
                    className="ActionBarButtonEven"
                    id="FilterDocumentButton"
                    type="button" >
                    DOCUMENT
                 </button>
                 <button 
                    className="ActionBarButtonOdd"
                    id="FilterCalendarButton"
                    type="button" >
                    CALENDAR
                 </button>
                 <button 
                    className="ActionBarButtonEven"
                    id="FilterLinkButton"
                    type="button" >
                    LINK
                 </button>
             </div>
         )
     }
 }
 