import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './Input';
import '@testing-library/jest-dom';

describe('Input Component', () => {
  test('renders enabled input with label and value', () => {
    render(<Input label="Email" value="user@example.com" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByDisplayValue('user@example.com')).toBeEnabled();
  });

  test('renders disabled input', () => {
    render(<Input label="Email" value="user@example.com" disabled />);
    const input = screen.getByDisplayValue('user@example.com');
    expect(input).toBeDisabled();
  });
});
