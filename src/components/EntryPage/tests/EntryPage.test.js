import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react';
import EntryPage from '../EntryPage';

afterEach(cleanup);

test('should render the login button', () => {
    const { getByTestId  } = render(<EntryPage/>);
    expect(getByTestId("Login-button")).toHaveTextContent("Log In");
});
test('should render the register button', () => {
    const { getByTestId  } = render(<EntryPage/>);
    expect(getByTestId("Register-button")).toHaveTextContent("Register");
});
