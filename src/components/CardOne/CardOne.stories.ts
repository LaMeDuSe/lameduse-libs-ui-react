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
    link: {
      children: 'See more',
      type: 'gradient2',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#',
      hover: 'scaleUp',
      clicked: 'jump'
    }
  },
};

export const NoBorder: Story = {
  args: {
    type: 'primary',
    image: 'https://lamedusegroup.com/images/code_2.png',
    description: 'This is a description',
    title: 'This is a title',
    link: {
      children: 'See more',
      type: 'gradient2',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#',
      hover: 'scaleUp',
      clicked: 'jump'
    },
    border: 'no-border',
  },
};

export const BlobEffect: Story = {
  args: {
    type: 'primary',
    description: 'A liquid morphing gradient shape reacting to hover and movement.',
    title: 'Organic Blob',
    interactiveEffect: 'blob',
    interactiveBgColor: '#0a0f24',
    interactiveColor: '#e0f2fe',
    interactiveColorSecondary: '#a855f7',
    link: {
      children: 'Interactive',
      type: 'gradient2',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#',
    }
  },
};

export const ParticlesEffect: Story = {
  args: {
    type: 'primary',
    description: 'Glowing dust elements attracted gravitationally by the cursor.',
    title: 'Gravity Particles',
    interactiveEffect: 'particles',
    interactiveBgColor: '#05050a',
    interactiveColor: '#22d3ee',
    link: {
      children: 'Interactive',
      type: 'gradient2',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#',
    }
  },
};

export const NeonGridEffect: Story = {
  args: {
    type: 'primary',
    description: 'A reactive cybernetic perspective grid warping under the mouse.',
    title: 'Warping Neon Grid',
    interactiveEffect: 'neon-grid',
    interactiveBgColor: '#030712',
    interactiveColor: '#3b82f6',
    link: {
      children: 'Interactive',
      type: 'gradient2',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#',
    }
  },
};

export const RippleEffect: Story = {
  args: {
    type: 'primary',
    description: 'Generates glowing neon concentric ripple waves on hover.',
    title: 'Concentric Ripples',
    interactiveEffect: 'ripple',
    interactiveBgColor: '#090514',
    interactiveColor: '#ec4899',
    link: {
      children: 'Interactive',
      type: 'gradient2',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#',
    }
  },
};

export const GlitchEffect: Story = {
  args: {
    type: 'primary',
    description: 'An abstract rotating wireframe shape with digital glitch scanlines on hover.',
    title: 'Holographic Glitch',
    interactiveEffect: 'glitch',
    interactiveBgColor: '#0c0a09',
    interactiveColor: '#f43f5e',
    interactiveColorSecondary: '#06b6d4',
    link: {
      children: 'Interactive',
      type: 'gradient2',
      style: 'solid',
      form: 'rounded',
      size: 'medium',
      href: '#',
    }
  },
};
