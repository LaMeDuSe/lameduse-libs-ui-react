import type { Meta, StoryObj } from '@storybook/nextjs';

import Navbar from './Navbar';

// @ts-ignore
import chevronImport from './chevron.png';
const chevron = chevronImport as { src: string };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'LaMeDuSe/Blocs/Navbar',
  component: Navbar,
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
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    NavItems: [
      {
        type: "logo",
        position: "left",
        src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad_text_primary_bg_white.webp",
        allowed_display: ["desktop"],
        label: "LaMeDuSe",
        height: 100,
        width: 300,
      },
      {
        type: "logo",
        position: "left",
        src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad.webp",
        allowed_display: ["mobile-outside"],
        label: "LaMeDuSe",
        height: 75,
        width: 75,
      },
      {
        type: "logo",
        position: "left",
        src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad.webp",
        allowed_display: ["mobile"],
        label: "LaMeDuSe",
        height: 100,
        width: 100,
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
        position: "center",
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
        ],
      imgSrc: chevron.src
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

export const Enddropdown: Story = {
  
  args: {
    NavItems: [
      {
        type: "logo",
        label: "LaMeDuSe",
        position: "left",
        src: "https://assets.lameduse.net/logo/lameduse_cloud_logo_grad_text_primary_bg_white.svg",
        href: "/",
        allowed_display: ["mobile"],
        height: 100,
        width: 300
    },
    {
        type: "logo",
        label: "LaMeDuSe",
        position: "left",
        src: "https://assets.lameduse.net/logo/lameduse_logo_grad.svg",
        href: "/",
        allowed_display: ["mobile-outside"],
        height: 100,
        width: 100
    },
    {
        type: "logo",
        label: "LaMeDuSe",
        position: "left",
        src: "https://assets.lameduse.net/logo/lameduse_cloud_logo_grad_text_primary_bg_white.svg",
        href: "/",
        allowed_display: ["desktop"],
        height: 100,
        width: 300
    },
    {
        type: "link",
        label: "home",
        href: "/",
        position: "center"

    },
    {
        type: "dropdown",
        label: "Hébergement",
        items: [
            {
              type: "link",
              position: "right",
              label: "VPS",
              href: "/",
            },
            {
              type: "link",
              position: "right",
              label:"serveur dédié",
              href: "/",
            },
            {
              type: "link",
              position: "right",
              label: "Kubernetes",
              href: "/",
            },
        ],
        imgSrc:"https://cdn-icons-png.flaticon.com/512/2909/2909294.png",
        position: "center"
    },
    {
        type: "dropdown",
        label: "Infogérence",
        position: "center",
        items: [
            {
              type: "link",
              position: "right",
              label: "infogerance",
              href: "/",
            },
            {
              type: "link",
              position: "right",
              label: "Maintien en conditions opérationel",
              href: "/",
            },
            {
              type: "link",
              position: "right",
              label: "remplacement de matériel",
              href: "/",
            },
        ],
        imgSrc:"https://cdn-icons-png.flaticon.com/512/2909/2909294.png"
    },
    {
        type: "link",
        label: "A propos",
        href: "/",
        position: "center"
    },
    {
        type: "link",
        label: "contactez nous",
        href: "/",
        position: "center"
    },
    {
      type: "link",
      label: "contact_us",
      href: "/",
      position: "right" 
    }
    ],
  },
};

export const CustomProps: Story = {
  
  args: {
    NavItems: [
      {
        type: "logo",
        position: "left",
        src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad_text_primary_bg_white.webp",
        allowed_display: ["desktop"],
        label: "LaMeDuSe",
        height: 100,
        width: 300,
      },
      {
        type: "logo",
        position: "left",
        src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad.webp",
        allowed_display: ["mobile-outside"],
        label: "LaMeDuSe",
        height: 75,
        width: 75,
      },
      {
        type: "logo",
        position: "left",
        src: "https://lamedusegroup.com/images/logos/lameduse_logo_grad.webp",
        allowed_display: ["mobile"],
        label: "LaMeDuSe",
        height: 75,
        width: 75,
      },
      {
        type: "link",
        position: "center",
        label: "Home",
        href: "#",
        additionalPropsMobile: {
          style: "text",
          form: "none",
          size: "none",
          text_style: "normal",
          className: "border-b border-lameduse-primary my-8 text-[16px] uppercase",
        },
      },
      {
        type: "link",
        position: "center",
        label: "About Us",
        href: "#",
        additionalPropsMobile: {
          style: "text",
          form: "none",
          size: "none",
          text_style: "normal",
          className: "border-b border-lameduse-primary my-8  text-[16px] uppercase",
        },
      },
      {
        type: "link",
        position: "right",
        label: "Login",
        href: "#",
        additionalProps: {
          style: "outline",
        },
        additionalPropsMobile: {
          style: "text",
          form: "none",
          size: "none",
          text_style: "normal",
          className: "border-b border-lameduse-primary my-8 text-[16px] uppercase",
        },
      },
      {
        type: "link",
        position: "right",
        label: "Sign Up",
        href: "#",
        additionalPropsMobile: {
          style: "text",
          form: "none",
          size: "none",
          text_style: "normal",
          className: "border-b border-lameduse-primary my-8 text-[16px] uppercase",
        },
      }
    ],
  },
};
