import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Navbar from './Navbar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Navbar',
  component: Navbar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  
  args: {
    type: 'primary',
    NavItems: [
      {
        type: "logo",
        position: "left",
        src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad_text_primary_bg_white.webp",
        label: "LaMeDuSe",
      },
      {
        type: "link",
        position: "center",
        label: "Home",
        href: "#",
      },
      {
        type: "link",
        position: "center",
        label: "About",
        href: "#",
      },
      {
        type: "link",
        position: "center",
        label: "Services",
        href: "#",
      },
      {
        type: "link",
        position: "center",
        label: "Contact",
        href: "#",
      },
      {
        type: "dropdown",
        position: "right",
        label: "Dropdown",
        items: [
          {
            type: "link",
            position: "right",
            label: "Item 1",
            href: "#",
          },
          {
            type: "link",
            position: "right",
            label: "Item 2",
            href: "#",
          },
          {
            type: "link",
            position: "right",
            label: "Item 3",
            href: "#",
          },
        ]
      },
      {
        type: "link",
        position: "right",
        label: "Login",
        href: "#",
      },
      {
        type: "link",
        position: "right",
        label: "Sign Up",
        href: "#",
      },
    ]
  },
};
