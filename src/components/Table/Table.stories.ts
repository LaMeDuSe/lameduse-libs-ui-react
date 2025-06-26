import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import Button from '../Button/Button'
import { ButtonProps } from '../Button/Button'


const buttons: ButtonProps[] = [
  {
  label: "Modify",
  type: "primary",
  style: "solid" ,
  form: "rounded",
  size: "small",
  },
  {
  label: "Send",
  type: "primary",
  style: "solid" ,
  form: "rounded",
  size: "small",
  },
    {
  label: "Delete",
  type: "primary",
  style: "solid" ,
  form: "rounded",
  size: "small",
  }
]

const meta: Meta<typeof Table>= {
  title: 'LaMeDuSe/Components/TableComponent',
  component: Table,
  parameters: {
    layout: 'centered', 
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story= {
  args: {
    buttons,
  }
};
