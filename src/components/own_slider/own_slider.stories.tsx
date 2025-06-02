// HeroSlider.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import HeroSlider from './hero_slider';
import { Slide } from './hero_slider_type';

const slides: Slide[] = [
  {
    id: 1,
    title: 'Slide 1',
    subtitle: 'Ceci est le premier slide.',
    image: 'https://dummyimage.com/600x400/002697/ffffff&text=Slide+1',
    buttonLabel: 'Découvrir',
    buttonUrl: '#',
  },
  {
    id: 2,
    title: 'Slide 2',
    subtitle: 'Ceci est le second slide.',
    image: 'https://dummyimage.com/600x400/000367/ffffff&text=Slide+2',
    buttonLabel: 'Explorer',
    buttonUrl: '#',
  },
];

const meta: Meta<typeof HeroSlider> = {
  title: 'Components/HeroSlider',
  component: HeroSlider,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof HeroSlider>;

export const Default: Story = {
  args: {
    slides,
    autoPlay: false,
  },
};
