import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import CardOne from './CardOne';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Components/CardOne',
  component: CardOne,
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
} satisfies Meta<typeof CardOne>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'primary',
    image: 'https://lamedusegroup.com/images/code_2.png',
    description: 'This is a description',
    title: 'This is a title',
    link_url: '/',
    link_text: 'Link',
  },
};

export const NoBorder: Story = {
  args: {
    type: 'primary',
    image: 'https://lamedusegroup.com/images/code_2.png',
    description: 'This is a description',
    title: 'This is a title',
    link_url: '/',
    link_text: 'Link',
    border: 'no-border',
  },
};
