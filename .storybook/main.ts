import { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-docs"
  ],

  framework: {
    // This value is the same as the `framework` value in the `package.json` file
    name: "@storybook/nextjs",
    options: {}
    // More on framework configuration: https://storybook.js.org/docs/react/configure/frameworks
    // More on using the `framework` parameter: https://storybook.js.org/docs/react/configure/story-rendering
  },

  features: {
    viewportStoryGlobals: true,
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;
