import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
```javascript
import App from '../src/App';

test('renders the app and checks for elements', () => {
    render(<App />);
    const linkElement = screen.getByText(/Welcome to the Voting App/i);
    expect(linkElement).toBeInTheDocument();
});

test('allows user to submit a proposal', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Enter proposal/i);
    fireEvent.change(inputElement, { target: { value: 'New Proposal' } });
    fireEvent.click(screen.getByText(/Submit/i));
    const proposalElement = screen.getByText(/New Proposal/i);
    expect(proposalElement).toBeInTheDocument();
});
