/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '450px',
      xs: '540px',
      sm: '640px',
      md: '768px',
      lg: '1020px',
      xl: '1440px',
      '2xl': '1920px',
      '3xl': '2560px',
    },
    extend: {
      colors: {
        'sunset-orange': '#fc4747',
        'sunset-orange-light': '#fc6a6a',
        vulcan: '#10141e',
        'waikawa-gray': '#5a698f',
        mirage: '#161d2f',
      },
      textShadow: {
        default: '0 2px 5px rgba(0, 0, 0, 0.5)',
        md: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
      },
      keyframes: {
        colorChange: {
          '0%': { backgroundColor: '#ffffff' },
          '50%': { backgroundColor: '#ccc' },
          '100%': { backgroundColor: '#ffffff' },
        },
      },
      animation: {
        'colorChange-1': 'colorChange 0.2s infinite',
        'colorChange-2': 'colorChange 0.2s 0.125s infinite',
        'colorChange-3': 'colorChange 0.2s 0.25s infinite',
        'colorChange-4': 'colorChange 0.2s 0.375s infinite',
      },
      aspectRatio: {
        none: 0,
        square: [1, 1], // or '1/1'
        '16/9': [16, 9], // or '16/9'
        '4/3': [4, 3], // or '4/3'
        '21/9': [21, 9], // or '21/9'
        // ...
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-textshadow'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
