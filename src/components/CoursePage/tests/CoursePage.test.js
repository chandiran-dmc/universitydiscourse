import React from 'react';
import { render } from '@testing-library/react';
import CoursePage from '../CoursePage';

// component render testing

test('should render course number', () => {
    const { findByText } = render(<CoursePage />);
    expect(findByText("number")).toBeTruthy();
});

test('should render course title', () => {
  const { findByText } = render(<CoursePage />);
  expect(findByText("title")).toBeTruthy();
});

test('should render course description', () => {
  const { findByText } = render(<CoursePage />);
  expect(findByText("description")).toBeTruthy();
});

test('should render course number', () => {
  const { findByText } = render(<CoursePage />);
  expect(findByText("course number")).toBeTruthy();
});