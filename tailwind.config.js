// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        customRed: 'rgb(115,35,35)',
        customRedLight: 'rgb(140,50,50)', // A similar, lighter color
      },
    },
  },
  plugins: [],
}