import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react';
import CreatePostPage from '../CreatePostPage';

afterEach(cleanup);

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

function getRandomCreatePostPageData(type) {
    let data = {};
    data.title = makeid(Math.random()*randomLength%randomLength);
    // data.Content = makeid(Math.random()*randomLength%randomLength);
    // data.user = makeid(Math.random()*randomLength%randomLength);
    // data.time = (new Date().getTime()) - Math.random()*randomLength%randomLength;
    // data.tag = [];
    // for (let i = 0; i < Math.random()*randomLength%randomLength; i++) {
    //     data.tag.push(makeid(Math.random()*randomLength%randomLength));
    // }
    // data.comments = [];
    // for (let i = 0; i < Math.random()*randomLength%randomLength; i++) {
    //     data.comments.push(makeid(Math.random()*randomLength%randomLength));
    // }

    data.type = type; // text, image, calendar, etc.

    // data.count = Math.random()*randomLength%randomLength;
    // data.reportCount = Math.random()*randomLength%randomLength;
    // data.likeCount = Math.random()*randomLength%randomLength;
    // data.upvoteCount = Math.random()*randomLength%randomLength;
    // data.downvoteCount = Math.random()*randomLength%randomLength;
    return data;
}

//========================= Text type

test('should render "post title" text field', () => {

    const mockPostData = getRandomCreatePostPageData("text");
    let temp = {
        state: mockPostData
    };

    const { findByText } = render(<CreatePostPage location={temp}/>);
    expect(findByText("Post Title")).toBeTruthy();
});

test('should render "post content" text field', () => {

    const mockPostData = getRandomCreatePostPageData("text");
    let temp = {
        state: mockPostData
    };

    const { findByText } = render(<CreatePostPage location={temp}/>);
    expect(findByText("Post Content")).toBeTruthy();
});

test('should render "post tags" text field', () => {

    const mockPostData = getRandomCreatePostPageData("text");
    let temp = {
        state: mockPostData
    };

    const { findByText } = render(<CreatePostPage location={temp}/>);
    expect(findByText("Tags")).toBeTruthy();
});

test('should render "make post" button', () => {

    const mockPostData = getRandomCreatePostPageData("text");
    let temp = {
        state: mockPostData
    };

    const { getByTestId } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-submit")).toHaveTextContent("MAKE POST");
});

test('should initilize the text field for post title', () => {

    const mockPostData = getRandomCreatePostPageData("text");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-title")).toHaveTextContent("Post Title");
});

test('should initilize the text field for post content', () => {

    const mockPostData = getRandomCreatePostPageData("text");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-content")).toHaveTextContent("Post Content");
});

test('should initilize the text field for post tags', () => {

    const mockPostData = getRandomCreatePostPageData("text");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-tags")).toHaveTextContent("Tags");
});

//========================= Image type

test('should render "post title" text field', () => {

    const mockPostData = getRandomCreatePostPageData("image");
    let temp = {
        state: mockPostData
    };

    const { findByText } = render(<CreatePostPage location={temp}/>);
    expect(findByText("Post Title")).toBeTruthy();
});

test('should render "post content" text field', () => {

    const mockPostData = getRandomCreatePostPageData("image");
    let temp = {
        state: mockPostData
    };

    const { findByText } = render(<CreatePostPage location={temp}/>);
    expect(findByText("Post Content")).toBeTruthy();
});

test('should render "post tags" text field', () => {

    const mockPostData = getRandomCreatePostPageData("image");
    let temp = {
        state: mockPostData
    };

    const { findByText } = render(<CreatePostPage location={temp}/>);
    expect(findByText("Tags")).toBeTruthy();
});

test('should render "make post" button', () => {

    const mockPostData = getRandomCreatePostPageData("image");
    let temp = {
        state: mockPostData
    };

    const { getByTestId } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-submit")).toHaveTextContent("MAKE POST");
});

test('should initilize the text field for post title', () => {

    const mockPostData = getRandomCreatePostPageData("image");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-title")).toHaveTextContent("Post Title");
});

test('should initilize the text field for post content', () => {

    const mockPostData = getRandomCreatePostPageData("image");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-image")).toHaveTextContent("Post Image URL");
});

test('should initilize the text field for post title', () => {

    const mockPostData = getRandomCreatePostPageData("image");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-tags")).toHaveTextContent("Tags");
});

//========================= Grade type

// test('should render "Course Name" text field', () => {

//     const mockPostData = getRandomCreatePostPageData("grade");
//     let temp = {
//         state: mockPostData
//     };

//     const { findByText } = render(<CreatePostPage location={temp}/>);
//     expect(findByText("Course Name")).toBeTruthy();
// });

// test('should render "Score (in percentage)" text field', () => {

//     const mockPostData = getRandomCreatePostPageData("grade");
//     let temp = {
//         state: mockPostData
//     };

//     const { findByText } = render(<CreatePostPage location={temp}/>);
//     expect(findByText("Score (in percentage)")).toBeTruthy();
// });

// test('should render "Grade (A ~ F)" text field', () => {

//     const mockPostData = getRandomCreatePostPageData("grade");
//     let temp = {
//         state: mockPostData
//     };

//     const { findByText } = render(<CreatePostPage location={temp}/>);
//     expect(findByText("Grade (A ~ F)")).toBeTruthy();
// });

// test('should render "make post" button', () => {

//     const mockPostData = getRandomCreatePostPageData("grade");
//     let temp = {
//         state: mockPostData
//     };

//     const { getByTestId } = render(<CreatePostPage location={temp}/>);
//     expect(getByTestId("post-submit")).toHaveTextContent("MAKE POST");
// });

// test('should initilize the text field for course name', () => {

//     const mockPostData = getRandomCreatePostPageData("grade");
//     let temp = {
//         state: mockPostData
//     };

//     const { getByTestId  } = render(<CreatePostPage location={temp}/>);
//     expect(getByTestId("post-coursename")).toHaveTextContent("");
// });

// test('should initilize the text field for score', () => {

//     const mockPostData = getRandomCreatePostPageData("grade");
//     let temp = {
//         state: mockPostData
//     };

//     const { getByTestId  } = render(<CreatePostPage location={temp}/>);
//     expect(getByTestId("post-coursescore")).toHaveTextContent("%");
// });

// test('should initilize the text field for grade', () => {

//     const mockPostData = getRandomCreatePostPageData("grade");
//     let temp = {
//         state: mockPostData
//     };

//     const { getByTestId  } = render(<CreatePostPage location={temp}/>);
//     expect(getByTestId("post-coursegrade")).toHaveTextContent("");
// });

//========================= Curve type

// test('should render "Course Name" text field', () => {

//     const mockPostData = getRandomCreatePostPageData("curve");
//     let temp = {
//         state: mockPostData
//     };

//     const { findByText } = render(<CreatePostPage location={temp}/>);
//     expect(findByText("Course Name")).toBeTruthy();
// });

test('should render "Curve (lower bound)" text field', () => {

    const mockPostData = getRandomCreatePostPageData("curve");
    let temp = {
        state: mockPostData
    };

    const { findByText } = render(<CreatePostPage location={temp}/>);
    expect(findByText("Curve (lower bound)")).toBeTruthy();
});

test('should render "make post" button', () => {

    const mockPostData = getRandomCreatePostPageData("curve");
    let temp = {
        state: mockPostData
    };

    const { getByTestId } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-submit")).toHaveTextContent("MAKE POST");
});

test('should initilize the text field for course name', () => {

    const mockPostData = getRandomCreatePostPageData("curve");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-coursename")).toHaveTextContent("");
});

// test('should initilize the text field for bound A', () => {

//     const mockPostData = getRandomCreatePostPageData("curve");
//     let temp = {
//         state: mockPostData
//     };

//     const { getByTestId  } = render(<CreatePostPage location={temp}/>);
//     expect(getByTestId("post-bound-A")).toHaveTextContent("A%");
// });

test('should initilize the text field for bound B', () => {

    const mockPostData = getRandomCreatePostPageData("curve");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-bound-B")).toHaveTextContent("B%");
});

test('should initilize the text field for bound C', () => {

    const mockPostData = getRandomCreatePostPageData("curve");
    let temp = {
        state: mockPostData
    };

    const { getByTestId  } = render(<CreatePostPage location={temp}/>);
    expect(getByTestId("post-bound-C")).toHaveTextContent("C%");
});

// test('should initilize the text field for bound D', () => {

//     const mockPostData = getRandomCreatePostPageData("curve");
//     let temp = {
//         state: mockPostData
//     };

//     const { getByTestId  } = render(<CreatePostPage location={temp}/>);
//     expect(getByTestId("post-bound-D")).toHaveTextContent("D%");
// });