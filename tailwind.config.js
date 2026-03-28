/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: { light: "#F0EBE1", dark: "#1A1A1A" },
        surface: { light: "#FFFFFF", dark: "#242424" },
        "text-primary": { light: "#1A1A1A", dark: "#F0EBE1" },
        muted: "#73757F",
        "accent-red": "#FF4D4D",
        "accent-green": "#2ECC71",
        "accent-blue": "#ADCAD6",
      },
    },
  },
};