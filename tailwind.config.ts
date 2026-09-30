import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#c5dcff',
          300: '#9ac4ff',
          400: '#67a0ff',
          500: '#3c79ff',
          600: '#1d55f5',
          700: '#143fe0',
          800: '#1533b6',
          900: '#0d246f',
          950: '#071649',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
    },
  },
  plugins: [],
};
export default config;
