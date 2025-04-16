import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Footer from './Footer';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Blocs/Footer',
  component: Footer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded', // 'fullscreen' | 'padded' | 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    companyInfos: {
      logo: "https://assets.lameduse.net/logo/lameduse_group_logo_grad_text_primary_bg_white.png",
      logo_size: { width: 192, height: 64 },
      description: "At LaMeDuSe Group we believe in innovation and creativity. We are a team of passionate who are dedicated to pushing the boundaries of technology and design.",
      name: "LaMeDuSe Group",
      address: "131 Rue Saint-Honoré 75001 Paris",
      email: "contact@lamedusegroup.com",
      phone: "+33 (0)9 72 17 39 01",
      id_number: "915248579",
    },
    links: [
      {
        title: 'Company',
        links: [
          { href: '/', label: 'About us' },
          { href: '/', label: 'Careers' },
          { href: '/', label: 'Contact us' },
          { href: '/', label: 'Privacy policy' },
        ],
      },
      {
        title: 'Services',
        links: [
          { href: '/', label: 'Web Development' },
          { href: '/', label: 'Mobile Development' },
          { href: '/', label: 'UI/UX Design' },
          { href: '/', label: 'Cloud Solutions' },
        ],
      },
    ]

   },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    companyInfos: {
      logo: "https://assets.lameduse.net/logo/lameduse_group_logo_grad_text_primary_bg_white.png",
      logo_size: { width: 192, height: 64 },
      description: "At LaMeDuSe Group we believe in innovation and creativity. We are a team of passionate who are dedicated to pushing the boundaries of technology and design.",
      name: "LaMeDuSe Group",
      address: "131 Rue Saint-Honoré 75001 Paris",
      email: "contact@lamedusegroup.com",
      phone: "+33 (0)9 72 17 39 01",
      id_number: "915248579",
    },
    links: [
      {
        title: 'Company',
        links: [
          { href: '/', label: 'About us' },
          { href: '/', label: 'Careers' },
          { href: '/', label: 'Contact us' },
          { href: '/', label: 'Privacy policy' },
        ],
      },
      {
        title: 'Services',
        links: [
          { href: '/', label: 'Web Development' },
          { href: '/', label: 'Mobile Development' },
          { href: '/', label: 'UI/UX Design' },
          { href: '/', label: 'Cloud Solutions' },
        ],
      },
    ]
  }
};
