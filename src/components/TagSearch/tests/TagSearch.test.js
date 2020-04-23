import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react';
import TagSearch from '../TagSearch';

afterEach(cleanup);

test('should render "Search for Tags"', () => {

    const { findByText } = render(<TagSearch/>);
    expect(findByText("Search for Tags")).toBeTruthy();
});

test('should render the autocomplete', () => {

    const { getByTestId  } = render(<TagSearch/>);
    expect(getByTestId("tag-search")).toHaveTextContent("Select Tags");
});

test('should render the search button', () => {
    const { getByTestId  } = render(<TagSearch/>);
    expect(getByTestId("search-button")).toHaveTextContent("Search");
});
