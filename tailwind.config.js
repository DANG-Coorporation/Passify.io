/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#1450A3",
        secondaryColor: "#FFF",
      },
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateX(130%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideOut: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(130%)" },
      },
    },
    animation: {
      "toast-slideIn": "slideIn 0.3s ease-out",
      "toast-slideOut": "slideOut 0.3s ease-in",
    },
  },
  plugins: [],
};
