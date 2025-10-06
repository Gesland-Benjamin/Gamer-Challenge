module.exports = {
  content: ["./app/views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
      },

      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Police par défaut pour tout le site
        cal: ["Cal Sans", "sans-serif"],
        courgette: ["Courgette", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
