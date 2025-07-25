import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconProps } from './Icon';
import React from 'react';
import Icon from './Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Components/Icon',
  component: Icon,
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
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/*export const Primary: Story = {
  args: {
    icon: "TWITTER"
  },
};

export const Secondary: Story = {
  args: {
    icon: "GITHUB"
  },
};*/

export const TwoCustomButtons = (args: IconProps) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Icon {...args} icon="IDENTITY CARD"/>
    <Icon {...args} icon="LAMEDUSE"/>
    <Icon {...args} icon="MAILBOX" />
    <Icon {...args} icon="OUTBOX" />
    <Icon {...args} icon="INBOX" />
    <Icon {...args} icon="MAILBOX" />
    <Icon {...args} icon="BOX" />
    <Icon {...args} icon="LINKEDIN" />
    <Icon {...args} icon="TWITTER" />
    <Icon {...args} icon="DISCORD" />
    <Icon {...args} icon="GITHUB" />
    <Icon {...args} icon="CHECK" /> 
    <Icon {...args} icon="WARNING" />
    <Icon {...args} icon="CROSSMARK" />
  </div>
);
