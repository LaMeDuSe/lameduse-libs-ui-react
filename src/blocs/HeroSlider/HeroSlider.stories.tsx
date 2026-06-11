// HeroSlider.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/nextjs';
import HeroSlider, { Slide } from './HeroSlider';

const slides: Slide[] = [
  {
    title: 'Lorem ipsum dolor !',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt in erat ac faucibus. Sed vel malesuada magna, nec ultrices urna. ',
    image: 'https://picsum.photos/2000/300',
    buttons: [{
      children: 'Explorer',
      href: '#',
    },
    {
      children: 'Explorer',
      href: '#',
    }],
    style: 'default',
    imgClassName: 'blur-sm'
  },
  {
    title: 'Lorem ipsum !',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt in erat ac faucibus. Sed vel malesuada magna, nec ultrices urna.',
    image: 'https://picsum.photos/2000/300',
    buttons: [{
      children: 'Explorer',
      href: '#',
    },
    {
      children: 'Explorer',
      href: '#',
    }],
    style: 'left',
    imgClassName: 'blur-md'
  },
  {
    title: 'Lorem ipsum !',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt in erat ac faucibus. Sed vel malesuada magna, nec ultrices urna.',
    image: 'https://picsum.photos/2000/300',
    buttons: [{
      children: 'Explorer',
      href: '#',
    },
    {
      children: 'Explorer',
      href: '#',
      form: "none"
    }],
    style: 'right',
    imgClassName: 'blur-xl'
  },
];

const interactiveSlides: Slide[] = [
  {
    title: 'Plexus Gravity Field',
    subtitle: 'Move your mouse over the screen and watch particles gravitate toward the cursor in a physical attraction network.',
    gradientBg: 'bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950',
    bgEffect: 'plexus',
    bgEffectColor: 'rgba(1, 180, 182, 0.85)',
    bgEffectColorSecondary: 'rgba(0, 128, 226, 0.85)',
    buttons: [{
      children: 'Explore Plexus',
      href: '#'
    }],
    style: 'default'
  },
  {
    title: 'Grid Distortion Field',
    subtitle: 'Move your mouse to warp and distort an elastic digital grid, illustrating network flexibility.',
    gradientBg: 'bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-950',
    bgEffect: 'grid-warp',
    bgEffectColor: 'rgba(0, 128, 226, 0.7)',
    buttons: [{
      children: 'Warp Grid',
      href: '#'
    }],
    style: 'left'
  },
  {
    title: 'Constellation Tracker',
    subtitle: 'Hover to connect drifting stars directly to your cursor, forming dynamic constellations on the fly.',
    gradientBg: 'bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-950',
    bgEffect: 'constellation',
    bgEffectColor: 'rgba(139, 92, 246, 0.85)',
    bgEffectColorSecondary: 'rgba(236, 72, 153, 0.85)',
    buttons: [{
      children: 'Form Constellations',
      href: '#'
    }],
    style: 'right'
  },
  {
    title: 'Cosmic Repulsion Starfield',
    subtitle: 'Float through a space where particles disperse and escape as your cursor approaches.',
    gradientBg: 'bg-gradient-to-tr from-slate-950 via-emerald-950 to-slate-950',
    bgEffect: 'repulsion',
    bgEffectColor: 'rgba(34, 197, 94, 0.85)',
    buttons: [{
      children: 'Push Starfield',
      href: '#'
    }],
    style: 'default'
  },
  {
    title: 'Ambient Magnetic Glow',
    subtitle: 'Experience soft, fluid color shapes that shift in high-fidelity 3D parallax layers as you move.',
    gradientBg: 'bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950',
    bgEffect: 'magnetic-glow',
    bgEffectColor: 'rgba(1, 180, 182, 0.6)',
    bgEffectColorSecondary: 'rgba(236, 72, 153, 0.6)',
    buttons: [{
      children: 'View Ambient Glow',
      href: '#'
    }],
    style: 'default'
  }
];

const meta: Meta<typeof HeroSlider> = {
  title: 'LaMeDuSe/Blocs/HeroSlider',
  component: HeroSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slides,
    autoPlay: false,
    enableShapeDivider: true,
  }
};

export const InteractiveGradients: Story = {
  args: {
    slides: interactiveSlides,
    autoPlay: false,
    enableShapeDivider: true,
  }
};
