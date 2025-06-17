import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import CTA from './CTA';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Components/CTA',
  component: CTA,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered', // 'fullscreen' | 'padded' | 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    first: {
      label : { control: 'text' },
      style : { control: 'radio' },
      form : { control: 'radio' },
      size : { control: 'radio' },
      href : { control: 'text' },
    },
    second: {
      label : { control: 'text' },
      style : { control: 'radio' },
      form : { control: 'radio' },
      size : { control: 'radio' },
      href : { control: 'text' },
    },
    //   backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    first : {
      children: 'See more',
      type: 'primary',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#'
    },
    second : {
      children: 'Call us',
      type: 'secondary',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#'
    },
  }
};

export const Secondary: Story = {
  args: {
    first : {
      children: 'See more',
      type: 'primary',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#'
    },
    second : {
      children: 'Call us',
      type: 'secondary',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#'
    },
  }
};