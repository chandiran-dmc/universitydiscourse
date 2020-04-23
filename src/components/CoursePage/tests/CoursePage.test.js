import React from 'react';
import { render } from '@testing-library/react';
import CoursePage from '../CoursePage';
import { unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// component render testing
it ("Should render coursepage with the appropriate contents", () => {
    act(() => {
        render(<CoursePage />, container);
    });
    expect(container.textContent).toBe("bullshit");
});



// test('should render course number', () => {
//     const { findByText } = render(<CoursePage />);
//     expect(findByText("number")).toBeTruthy();
// });

// test('should render course title', () => {
//   const { findByText } = render(<CoursePage />);
//   expect(findByText("title")).toBeTruthy();
// });

// test('should render course description', () => {
//   const { findByText } = render(<CoursePage />);
//   expect(findByText("description")).toBeTruthy();
// });

// test('should render course number', () => {
//   const { findByText } = render(<CoursePage />);
//   expect(findByText("course number")).toBeTruthy();
// });