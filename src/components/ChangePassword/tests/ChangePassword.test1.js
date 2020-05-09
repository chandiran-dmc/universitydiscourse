import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react';
import ChangePassword from '../ChangePassword';

afterEach(cleanup);

test('should render "Change Password"', () => {

    const { findByText } = render(<ChangePassword/>);
    expect(findByText("Change Password")).toBeTruthy();
});

test('should render the text field for email', () => {

    const { getByTestId  } = render(<ChangePassword/>);
    expect(getByTestId("Email")).toHaveTextContent("Email");
});

test('should render the text field for old password', () => {

    const { getByTestId  } = render(<ChangePassword/>);
    expect(getByTestId("Old-password")).toHaveTextContent("Old-Password");
});

test('should render the text field for new password', () => {

    const { getByTestId  } = render(<ChangePassword/>);
    expect(getByTestId("New-password")).toHaveTextContent("New-Password");
});

test('should render the done button', () => {
    const { getByTestId  } = render(<ChangePassword/>);
    expect(getByTestId("Done-button")).toHaveTextContent("Done");
});
