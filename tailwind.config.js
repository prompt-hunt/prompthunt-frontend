const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["Inter", ...fontFamily.sans],
      },
      colors: {
        "base-content-neutral": "hsl(var(--bc) / 0.6)",
      },
      gridTemplateColumns: {
        autofill: "repeat(auto-fill, minmax(18rem, 1fr))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-radix")(),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "--btn-text-case": "none",
          "--rounded-btn": "0.75rem",
          primary: "#9A00F9",
          accent: "#6ccde6",
          secondary: "#1f2937",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "--btn-text-case": "none",
          "--rounded-btn": "0.75rem",
          primary: "#9A00F9",
          accent: "#6ccde6",
          secondary: "#1f2937",
        },
      },
    ],
  },
};
