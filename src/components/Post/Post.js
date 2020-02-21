/**
 * This is a react component for post
 * 
 * This component should consist of:
 * - title (String): title of the post
 * - content (String) : text or url 
 * - user (String) : author of the post
 * - time (Date)   : upload time
 * - tags (Tag[])  : tags
 * - comments      : comment thread
 * - type          : type of the post (text, image, calendar, link, document)
 * - count         : upvote downvote total
 */


import React, { Component } from 'react'

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            content: props.content,
            user: props.user,
            time: props.time,
            tags: props.tags,
            comments: props.comments,
            type: props.type,
            count: props.count
        };
    }

    render() {
        return (
            <div className="postContainer">
                <p>{this.state.title}</p>
                <p>{this.state.user}</p>
                <p>{new Date(this.state.time).toDateString}</p>
                <p>{this.state.content}</p>
                
            </div>
        )
    }
}
