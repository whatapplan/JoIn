const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
  prefix: "",
  purge: {
    enabled: guessProductionMode(),
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        green: "var(--green)",
        "green-clear": "var(--green-clear)",
        pink: "var(--pink)",
        "pink-clear": "var(--pink-clear)",
        dark: "var(--dark)",
        "dark-clear": "var(--dark)",
        white: "var(--white)",
      },
      textColor: {
        green: "var(--green)",
        "green-clear": "var(--green-clear)",
        pink: "var(--pink)",
        "pink-clear": "var(--pink-clear)",
        dark: "var(--dark)",
        "dark-clear": "var(--dark)",
        white: "var(--white)",
      },
      backgroundColor: {
        green: "var(--green)",
        "green-clear": "var(--green-clear)",
        pink: "var(--pink)",
        "pink-clear": "var(--pink-clear)",
        dark: "var(--dark)",
        "dark-clear": "var(--dark)",
        white: "var(--white)",
      },
      fontFamily: {
        primary: ["Manrope", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
