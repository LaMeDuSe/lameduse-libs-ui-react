// HeroSlider.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
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
    style: 'default'
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
    style: 'left'
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
    style: 'right'
  },
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
  }
}
