/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        chap: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        surface: {
          dark: "#0f172a",
          darker: "#020617",
          light: "#f8fafc",
          muted: "#f1f5f9",
        },
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(15, 23, 42, 0.12)",
        glow: "0 0 40px -8px rgba(124, 58, 237, 0.35)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        chap: {
          primary: "#7c3aed",
          "primary-content": "#ffffff",
          secondary: "#6366f1",
          accent: "#22d3ee",
          neutral: "#1e293b",
          "base-100": "#ffffff",
          "base-200": "#f1f5f9",
          "base-300": "#e2e8f0",
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
};
