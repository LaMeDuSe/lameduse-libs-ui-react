import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { HeroSlider } from './slider';
import { SliderProvider } from './slideProvider';

const meta: Meta<typeof HeroSlider> = {
  component: HeroSlider,
  decorators: [
    (Story) => (
      <SliderProvider>
        <Story />
      </SliderProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof HeroSlider>;

const slides = [
  {
    image: 'https://dummyimage.com/600x400/002697/ffffff&text=Slide+1',
    title: 'Slide 1',
    description: 'Description 1',
  },
  {
    image: 'https://dummyimage.com/600x400/000367/ffffff&text=Slide+2',
    title: 'Slide 2',
    description: 'Description 2',
  },
  {
    image: 'https://dummyimage.com/600x400/001133/ffffff&text=Slide+3',
    title: 'Slide 3',
    description: 'Description 3',
  },
];

export const Default: Story = {
  args: {
    slides,
    width: '100%',
    height: '500px',
  },
};






