import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import Heading from './Heading';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Blocs/Heading',
  component: Heading,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen', // 'fullscreen' | 'padded' | 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { 
    title: 'hello world !',
    description: 'This is a basic description',
   },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'hello world !',
    description: 'This is a basic description',
    image : "https://picsum.photos/2000/300",
    imagealt: "LaMeDuSe Group Logo",
    enableShapeDivider: true,
    enableAnimation: true
  },
};

export const GradiantOne: Story = {
  args: {
    theme: 'gradiant-1',
    title: 'hello world !',
    description: 'This is a basic description',
  },
};

export const GradiantTwo: Story = {
  args: {
    theme: 'gradiant-2',
    title: 'hello world !',
    description: 'This is a basic description',
  },
};

export const InteractiveBgPlexus: Story = {
  args: {
    title: 'Interactive Plexus Heading',
    description: 'Hover your mouse over this heading to see the plexus particle effect follow your cursor.',
    bgEffect: 'plexus',
    gradientBg: 'bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950',
    bgEffectColor: 'rgba(0, 128, 226, 0.85)',
    enableShapeDivider: true,
    enableAnimation: true
  },
};

export const InteractiveBgConstellation: Story = {
  args: {
    title: 'Interactive Constellation Heading',
    description: 'Move your cursor to trace connection lines and activate the holograph reticle.',
    bgEffect: 'constellation',
    gradientBg: 'bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-950',
    bgEffectColor: 'rgba(139, 92, 246, 0.85)',
    bgEffectColorSecondary: 'rgba(236, 72, 153, 0.85)',
    enableShapeDivider: true,
    enableAnimation: true
  },
};
