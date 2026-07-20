import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        surface: {
          50: "#f8f9fc",
          100: "#f1f3f9",
          200: "#e2e6f0",
          300: "#c4cbe0",
          400: "#9ca6c8",
          500: "#7b87ad",
          600: "#626d92",
          700: "#505977",
          800: "#454c64",
          900: "#2d3142",
          950: "#1a1d2b",
        },
        accent: {
          DEFAULT: "#7c3aed",
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
      },
      animation: {
        shimmer: "shimmer 2.5s infinite linear",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "250% 0" },
          "100%": { backgroundPosition: "-250% 0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(124, 58, 237, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(124, 58, 237, 0.2)" },
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
