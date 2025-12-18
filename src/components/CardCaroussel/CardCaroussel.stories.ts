import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CardOne from '../../components/CardOne/CardOne';
import CardCaroussel from './CardCaroussel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Components/CardCaroussel',
  component: CardCaroussel,
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
  args: { onClick: fn() },
} satisfies Meta<typeof CardCaroussel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    Cards: [
      CardOne({
          type : 'primary',
          image : 'https://lamedusegroup.com/images/logo/Icon 2.png',
          description : 'This is a description',
          title : 'this is a title',
          link_url: '/',
          link_text: 'Link'
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 2",
        title: "Équipe 2",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 3",
        title: "Équipe 3",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 4",
        title: "Équipe 4",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 5",
        title: "Équipe 5",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 6",
        title: "Équipe 6",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 7",
        title: "Équipe 7",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 8",
        title: "Équipe 8",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 9",
        title: "Équipe 9",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 10",
        title: "Équipe 10",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 11",
        title: "Équipe 11",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 12",
        title: "Équipe 12",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 13",
        title: "Équipe 13",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 14",
        title: "Équipe 14",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 15",
        title: "Équipe 15",
        link_url: "/",
        link_text: "Link",
      }),
      CardOne({
        type: "primary",
        image: "https://lamedusegroup.com/images/logo/Icon 2.png",
        description: "Carte 16",
        title: "Équipe 16",
        link_url: "/",
        link_text: "Link",
      }),
    ],
    onClick: fn(),
  },
};