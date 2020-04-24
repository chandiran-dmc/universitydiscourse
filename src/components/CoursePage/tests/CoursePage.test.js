// import React from 'react';
// import { render, cleanup } from '@testing-library/react';
// import CoursePage from '../CoursePage';
// import Document from '../Document';

// afterEach(cleanup);

// test('should render with appropriate course page url', () => {

//     // // setup
//     // const mockedReplace = jest.fn();
//     // // without making a copy you will have a circular dependency problem during mocking
//     // const originalWindow = { ...window };
//     // const windowSpy = jest.spyOn(global, "window", "get");
//     // windowSpy.mockImplementation(() => ({
//     // ...originalWindow,
//     // location: {
//     //     ...originalWindow.location,
//     //     href: "http://localhost:3001/course/CS307",
//     //     replace: mockedReplace,
//     // },
//     // }));

//     // global.window = Object.create(window);
//     // const url = "http://localhost:3001/course/CS307";
//     // Object.defineProperty(window, 'location', {
//     //     value: {
//     //         href: url
//     //     }
//     // });
//     // expect(window.location.href).toEqual(url);

//     test('should render "post title" text field', () => {
    
//         const { findByText } = render(<CoursePage/>);
//         expect(findByText("Post Title")).toBeTruthy();
//     });

// });

// // test('should render "make post" button', () => {

// //     const { getByTestId } = render(<CoursePage />);
// //     expect(getByTestId("post-submit")).toHaveTextContent("MAKE POST");
// // });

// // 