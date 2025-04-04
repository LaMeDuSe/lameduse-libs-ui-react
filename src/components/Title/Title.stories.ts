import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Title from './Title';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Title',
  component: Title,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered', // 'fullscreen' | 'padded' | 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'primary',
    label: 'Our Services',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    label: 'My title',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    label: 'Title 3',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    label: 'Danger',
  },
};

export const White: Story = {
  args: {
    type: 'white',
    label: 'White',
  },
};
