import type { Preview } from "@storybook/nextjs";
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import '../src/styles/main.css';

const viewports_additions = {
  computer: {
    name: 'computer',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
}

const preview: Preview = {
  parameters: {
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        ...viewports_additions,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  initialGlobals: {
    viewport: { value: 'ipad', isRotated: false },
  },

  tags: ['autodocs']
};

export default preview;
