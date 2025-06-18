import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  test('renders copy icon and copies text to clipboard', async () => {
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    render(<Input label="Code" value="ABC123" copy />);
    const input = screen.getByDisplayValue('ABC123');
    fireEvent.click(input);
    expect(writeText).toHaveBeenCalledWith('ABC123');
  });
});
