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
        brand: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899', // Hot Rose
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        shein: {
          badge: '#111827',
          accent: '#000000',
        },
        temu: {
          badge: '#FB923C',
          accent: '#EA580C',
        },
        iherb: {
          badge: '#16A34A',
          accent: '#15803D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(236, 72, 153, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 25px -5px rgba(236, 72, 153, 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;
