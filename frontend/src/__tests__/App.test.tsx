import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Sqoopify app', () => {
  render(<App />);
  const title = screen.getAllByText('Sqoop');
  expect(title[0]).toBeInTheDocument();
});
