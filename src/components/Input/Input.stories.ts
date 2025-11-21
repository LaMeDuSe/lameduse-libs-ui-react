import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'LaMeDuSe/Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text', 
      description: 'Texte du label du champ',
      defaultValue: 'Label par défaut',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    label: 'Email',
    value: 'user@example.com',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email (disabled)',
    value: 'user@example.com',
    disabled: true,
  },
};

export const Copy: Story = {
  args: {
    label: 'Referral Code',
    value: 'SELMAXX',
    copy: true,
  },
};

export const EmailAvecValidation: Story = {
  args: {
    label: 'Adresse email (avec validation)',
    value: 'notanemail',
    verificate: (val: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : 'Email invalide',
  },
};
