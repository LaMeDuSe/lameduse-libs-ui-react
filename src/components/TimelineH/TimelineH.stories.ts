import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TimelineH from './TimelineH';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Components/TimelineH',
  component: TimelineH,
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
  args: {
    elements: [
      {
        title: 'Titre intéressant',
        content: 'Ceci est une phrase un peu longue pour voir ce que ça donne',
        year: '2024'
      },
      {
        title: 'Titre intéressant',
        content: 'Une autre phrase pour tester le composant TimelineH',
        year: '2025'
      }
    ],
  },
} satisfies Meta<typeof TimelineH>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    elements: [
      {
        title: 'titre intéressant',
        content: 'test ceci est une phrase un peu longue pour voir ce que ça donne',
        year: '2025'
      },
      {
        title: 'titre intéressant',
        content: 'Une autre phrase pour tester le composant TimelineH',
        year: '2024'
      }
    ],
  },
};