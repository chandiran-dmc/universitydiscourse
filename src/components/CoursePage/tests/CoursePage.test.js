import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CoursePage from '../CoursePage';


afterEach(cleanup);

test('should render "post tags" text field', () => {

    const { findByText } = render(<CoursePage />);
    expect(findByText("Tags")).toBeTruthy();
});

test('should render "make post" button', () => {

    const { getByTestId } = render(<CoursePage />);
    expect(getByTestId("post-submit")).toHaveTextContent("MAKE POST");
});