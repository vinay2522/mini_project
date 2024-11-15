module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,css}",  // Ensure CSS files are included here
  ],
  theme: {
    extend: {
      colors: {
        'seva-red': '#ff0000',
        'seva-blue': '#0000ff',
        'seva-light': '#f0f0f0',
        'seva-dark': '#333333',
        'seva-gray': '#d3d3d3', // Confirm this color is added here
      },
    },
  },
  plugins: [],
};
