import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#d0bcff",
        "on-primary": "#3c0091",
        "primary-container": "#a078ff",
        "primary-fixed": "#e9ddff",
        "primary-fixed-dim": "#d0bcff",
        "on-primary-container": "#340080",
        "on-primary-fixed": "#23005c",
        "on-primary-fixed-variant": "#5516be",

        secondary: "#4cd7f6",
        "on-secondary": "#003640",
        "secondary-container": "#03b5d3",
        "secondary-fixed": "#acedff",
        "secondary-fixed-dim": "#4cd7f6",
        "on-secondary-container": "#00424e",
        "on-secondary-fixed": "#001f26",
        "on-secondary-fixed-variant": "#004e5c",

        tertiary: "#ffafd3",
        "on-tertiary": "#620040",
        "tertiary-container": "#e364a7",
        "tertiary-fixed": "#ffd8e7",
        "tertiary-fixed-dim": "#ffafd3",
        "on-tertiary-container": "#560038",
        "on-tertiary-fixed": "#3d0026",
        "on-tertiary-fixed-variant": "#85145a",

        surface: "#0b1326",
        "surface-dim": "#0b1326",
        "surface-bright": "#31394d",
        "surface-tint": "#d0bcff",
        "surface-variant": "#2d3449",
        "surface-container-lowest": "#060e20",
        "surface-container-low": "#131b2e",
        "surface-container": "#171f33",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        "on-surface": "#dae2fd",
        "on-surface-variant": "#cbc3d7",
        "inverse-surface": "#dae2fd",
        "inverse-on-surface": "#283044",
        "inverse-primary": "#6d3bd7",

        background: "#0b1326",
        "on-background": "#dae2fd",

        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",

        outline: "#958ea0",
        "outline-variant": "#494454",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        gutter: "24px",
        "stack-lg": "48px",
        "stack-sm": "12px",
        unit: "4px",
        "stack-md": "24px",
        "margin-safe": "32px",
        "container-max": "1200px",
      },
      fontFamily: {
        "headline-lg": ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        "headline-md": ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        "display-lg": ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        "body-md": ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        "body-lg": ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        "headline-lg-mobile": ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        "label-md": ["var(--font-jetbrains)", "JetBrains Mono", "ui-monospace", "monospace"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-lg": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "500" }],
      },
      animation: {
        shimmer: "shimmer 2.5s infinite linear",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
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
      },
    },
  },
  plugins: [],
};
export default config;
