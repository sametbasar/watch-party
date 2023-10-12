import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          '50': '#fafafa',
          '100': '#dcdcdc',
          '400': '#8c8c8c',
          '500': '#464646',
          '600': '#282828',
          '700': '#1e1e1e',
        },
        border: '#323232',
        background: '#191919',
      },
    },
  },
  plugins: [],
};
export default config;
