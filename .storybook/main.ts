import { StorybookConfig } from "@storybook/nextjs/dist";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules to support PostCSS
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 }
              },
              {
                // Gets options from `postcss.config.js` in your project root
                loader: 'postcss-loader',
                options: { implementation: require.resolve('postcss') }
              }
            ],
          }
        ]
      }
    },
    "@storybook/addon-themes",
    "@storybook/addon-viewport",
    "@chromatic-com/storybook"
  ],

  framework: {
    // This value is the same as the `framework` value in the `package.json` file
    name: "@storybook/nextjs",
    options: {}
    // More on framework configuration: https://storybook.js.org/docs/react/configure/frameworks
    // More on using the `framework` parameter: https://storybook.js.org/docs/react/configure/story-rendering
  },

  docs: {
    autodocs: true
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;
