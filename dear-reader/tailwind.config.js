module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#617891",
        text: "#f6f6f6",
        foreground: "#617891",
        card: "#f6f6f6",
        icon: "#b3b3b3",
      },
      container: {
        padding: {
          DEFAULT: "20px",
          sm: "20px",
          md: "30px",
          xl: "40px",
        },
        center: true,
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      xl: "1280px",
    },
  },
  plugins: [],
};
