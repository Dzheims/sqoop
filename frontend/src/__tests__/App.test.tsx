import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Sqoopify sample from template', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sqoopify/i);
  expect(linkElement).toBeInTheDocument();
});
