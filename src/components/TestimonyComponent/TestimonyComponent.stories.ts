import type { Meta, StoryObj } from '@storybook/react';
import TestimonyComponent from './TestimonyComponent'; // <- nouveau composant

const meta = {
  title: 'LaMeDuSe/Components/TestimonyComponent', // <- chemin mis à jour
  component: TestimonyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    text: 'Paul is the CEO and Founder of LaMeDuSe. He is an entrepreneur, software engineer and a system administrator. He is passionate about new technologies and digital transformation.',
  },
} satisfies Meta<typeof TestimonyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
