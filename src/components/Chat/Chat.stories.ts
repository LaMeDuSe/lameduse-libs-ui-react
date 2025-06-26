import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Chat from './Chat';
import { MessageProps } from "./Message";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Components/Chat',
  component: Chat,
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
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    messages: [
      { id:5, author: "X1", content: "Hello!", timestamp: "9:00" },
      { id:3, author: "X2", content: "Salut, comment vas tu ?", timestamp: "9:01" },
      { id:6, author: "Moi", content: "Hey!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", timestamp: "9:02"},
      { id:1, author: "X1", content: "Très bien et toi?" },
      { id:2, author: "Moi", content: "je peux me rajouter a la discussion ?", timestamp: "10:02"},
      { id:4, author: "X2", content: "oui, bien sur", timestamp: "9:00" },
      { author: "X2", content: ":*$=àç_è-('", timestamp: "9:00" },
    ] as MessageProps[],
    script:false,
  },
};
