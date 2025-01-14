import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "lameduse-primary": "#1B1464",
        "lameduse-secondary": "#0080E2",
        "lameduse-tertiary": "#01B4B6",
        "lameduse-white": "#FFFFFF",
        "lameduse-black": "#000000",
      },
      grayscale: {
          50: '50%',
        }
      }
  },
  plugins: [],
}
export default config
