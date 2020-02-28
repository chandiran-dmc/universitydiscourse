import React from 'react';
import { render } from '@testing-library/react';
import MainFeedPage from '../MainFeedPage';


test('should render actionbar', () => {
    const { findByText } = render(<MainFeedPage/>);
    expect(findByText("create a post") && findByText("text") && findByText("image") && findByText("document") && findByText("calendar") && findByText("link")).toBeTruthy();
});

test('should render following tags section', () => {
    const { findByText } = render(<MainFeedPage/>);
    expect(findByText("following tags")).toBeTruthy();
});

test('should render profile section', () => {
    const { findByText } = render(<MainFeedPage/>);
    expect(findByText("profile") && findByText("change password") && findByText("change email") && findByText("logout")).toBeTruthy();
});