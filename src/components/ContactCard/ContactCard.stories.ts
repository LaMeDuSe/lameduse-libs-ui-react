import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import ContactCard from './ContactCard';
import { AtSymbolIcon, CalendarDaysIcon, PhoneIcon } from '@heroicons/react/24/solid';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Components/ContactCard',
  component: ContactCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen', // 'fullscreen' | 'padded' | 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { 
    name: "book a call",
    first_line: "With our team",
    second_line: "Monday - Friday",
    third_line: "9h - 20h (Paris Time)",
    link_url: "https://contactusbookcall.lamedusegroup.com/",
    link_text: "Book a call",
    Icon: CalendarDaysIcon
   },
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Calendar: Story = {
  args: {
    name: "book a call",
    first_line: "With our team",
    second_line: "Monday - Friday",
    third_line: "9h - 20h (Paris Time)",
    link_url: "https://contactusbookcall.lamedusegroup.com/",
    link_text: "Book a call",
    Icon: CalendarDaysIcon
  },
};

export const Phone: Story = {
  args: {
    name: "By Phone",
    first_line: "+33 (0)9 72 17 39 01",
    second_line: "Monday - Friday",
    third_line: "9h - 20h (Paris Time)",
    link_url: "https://contactus.lamedusegroup.com/",
    link_text: "Be called back",
    Icon: PhoneIcon
  },
};

export const Email: Story = {
  args: {
    name: "By Phone",
    first_line: "contact@lamedusegroup.com",
    second_line: "Monday - Friday",
    third_line: "9h - 20h (Paris Time)",
    link_url: "https://contactus.lamedusegroup.com/",
    link_text: "Be contacted by Email",
    Icon: AtSymbolIcon
  },
};
