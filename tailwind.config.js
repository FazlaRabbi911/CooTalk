/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0d1117',
        'glass':'#30363d62'
      },
      fontSize: {
        sml: '16px',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { opacity:'100%'},
          '50%': { opacity: '0%' },
        }
      },
      backgroundImageForchat: {
        'chatbg': "url('/src/assets/chatimg.png')",
      },

    },
  },
  plugins: [],
}

