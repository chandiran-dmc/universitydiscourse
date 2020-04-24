import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react';
import ChangeEmail from '../ChangeEmail';

afterEach(cleanup);

test('should render "Change Email"', () => {

    const { findByText } = render(<ChangeEmail/>);
    expect(findByText("Change Email")).toBeTruthy();
});

test('should render the text field for old email', () => {

    const { getByTestId  } = render(<ChangeEmail/>);
    expect(getByTestId("Old-email")).toHaveTextContent("Old-email");
});

test('should render the text field for new email', () => {

    const { getByTestId  } = render(<ChangeEmail/>);
    expect(getByTestId("New-email")).toHaveTextContent("New-email");
});

test('should render the done button', () => {
    const { getByTestId  } = render(<ChangeEmail/>);
    expect(getByTestId("Done-button")).toHaveTextContent("Done");
});
