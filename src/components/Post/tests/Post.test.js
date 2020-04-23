import React, { Component } from 'react';
import { render } from '@testing-library/react';
import {createMuiTheme} from '@material-ui/core';
import Post from '../Post';

// Blackbox Testing

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

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const randomLength = 40;

function getRandomPostData(type) {
    let data = {};
    data.title = makeid(Math.random()*randomLength%randomLength);
    data.Content = makeid(Math.random()*randomLength%randomLength);
    data.user = makeid(Math.random()*randomLength%randomLength);
    data.time = (new Date().getTime()) - Math.random()*randomLength%randomLength;
    data.tag = [];
    for (let i = 0; i < Math.random()*randomLength%randomLength; i++) {
        data.tag.push(makeid(Math.random()*randomLength%randomLength));
    }
    data.comments = [];
    for (let i = 0; i < Math.random()*randomLength%randomLength; i++) {
        data.comments.push(makeid(Math.random()*randomLength%randomLength));
    }
    data.type = type;
    data.count = Math.random()*randomLength%randomLength;
    data.reportCount = Math.random()*randomLength%randomLength;
    data.likeCount = Math.random()*randomLength%randomLength;
    data.upvoteCount = Math.random()*randomLength%randomLength;
    data.downvoteCount = Math.random()*randomLength%randomLength;
    return data;
}

test('should render text type post with correct title', () => {

    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(mockPostData.title)).toBeTruthy();
});

test('should render text type post with correct content', () => {

    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(mockPostData.Content)).toBeTruthy();
});

test('should render text type post with correct username', () => {

    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(mockPostData.user)).toBeTruthy();
});

test('should render text type post with correct time', () => {

    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(new Date(mockPostData.time).toTimeString())).toBeTruthy();
});

test('should render correct number of comments', () => {

    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(mockPostData.tag.length)).toBeTruthy();
});

test('should render correct number of upvotes', () => {
    
    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(mockPostData.upvoteCount)).toBeTruthy();
});

test('should render correct number of downvotes', () => {
    
    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(mockPostData.downvoteCount)).toBeTruthy();
});

test('should render correct number of likes', () => {
    
    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(mockPostData.likeCount)).toBeTruthy();
});

test('should render correct number of reports', () => {
    
    const mockPostData = getRandomPostData("text");

    const { findByText } = render(<Post data={mockPostData} theme={theme}/>);
    expect(findByText(mockPostData.reportCount)).toBeTruthy();
});