import React from 'react';
import { render } from '@testing-library/react';
import MainFeedPage from '../MainFeedPage';


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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

