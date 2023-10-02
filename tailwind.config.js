/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
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
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "toast-slideIn": "slideIn 0.3s ease-out",
      "toast-slideOut": "slideOut 0.3s ease-in",
      "spinner-loading": "spin 1s linear infinite",
    },
  },
};
