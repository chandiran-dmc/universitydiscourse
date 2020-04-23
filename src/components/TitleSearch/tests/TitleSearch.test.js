import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react';
import TitleSearch from '../TitleSearch';

afterEach(cleanup);

test('should render "Search for Title"', () => {

    const { findByText } = render(<TitleSearch/>);
    expect(findByText("Search for Title")).toBeTruthy();
});

test('should render the text field', () => {

    const { getByTestId  } = render(<TitleSearch/>);
    expect(getByTestId("title-search")).toHaveTextContent("Search Title");
});

test('should render the search button', () => {
    const { getByTestId  } = render(<TitleSearch/>);
    expect(getByTestId("search-button")).toHaveTextContent("Search");
});
