import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn, userEvent, within } from 'storybook/test';

import ToggleButton from './ToggleButton';
import { LiHTMLAttributes } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered', // 'fullscreen' | 'padded' | 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'white', 'gradient', 'free'],
    },
    size: {
        control: 'select',
        options: ['small', 'medium', 'large'],
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { 
    onToggle: fn(),
    labelOn: 'Activé',
    labelOff: 'Désactivé',
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    type: 'primary',
    children: 'Toggle', 
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('switch');
    await userEvent.click(toggleButton);
    await userEvent.click(toggleButton);
  },
};

export const Gradient: Story = {
  args: {
    type: 'gradient',
    children: 'Toggle', 
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Toggle', 
  },
};

export const CustomColor: Story = {
  args: {
    type: 'free',
    color_classOn: 'bg-blue-500',
    color_classOff: 'bg-red-500',
    labelOn: 'Blue',
    children: 'Toggle', 
  },
};
