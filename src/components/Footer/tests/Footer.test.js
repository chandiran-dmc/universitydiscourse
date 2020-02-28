import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

test('render component', () => {
    const { getByText } = render(<Footer />);
    let purpose = getByText("University discourse intends to assists students");
    expect(purpose).toBeInTheDocument();
});

test('render component', () => {
    const { getByText } = render(<Footer />);
    let purpose = getByText("in finding solutions to their academic concerns");
    expect(purpose).toBeInTheDocument();
});

test('render component', () => {
    const { getByText } = render(<Footer />);
    let purpose = getByText("Contact");
    expect(purpose).toBeInTheDocument();
});

test('render component', () => {
    const { getByText } = render(<Footer />);
    let purpose = getByText("Explore Links");
    expect(purpose).toBeInTheDocument();
});