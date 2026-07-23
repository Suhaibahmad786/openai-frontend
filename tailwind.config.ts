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
        primary: "#3b82f6",
        "on-primary": "#ffffff",
        "primary-container": "#2563eb",
        "primary-fixed": "#93c5fd",
        "primary-fixed-dim": "#60a5fa",
        "on-primary-container": "#1e3a5f",

        secondary: "#64748b",
        "on-secondary": "#ffffff",
        "secondary-container": "#475569",
        "secondary-fixed": "#cbd5e1",
        "secondary-fixed-dim": "#94a3b8",
        "on-secondary-container": "#1e293b",

        tertiary: "#14b8a6",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#0d9488",

        surface: "#0c1222",
        "surface-dim": "#0c1222",
        "surface-bright": "#1e293b",
        "surface-tint": "#3b82f6",
        "surface-variant": "#1e293b",
        "surface-container-lowest": "#080d1a",
        "surface-container-low": "#0f1729",
        "surface-container": "#141d30",
        "surface-container-high": "#1a2540",
        "surface-container-highest": "#222f4a",
        "on-surface": "#e2e8f0",
        "on-surface-variant": "#94a3b8",
        "inverse-surface": "#e2e8f0",
        "inverse-on-surface": "#0f172a",
        "inverse-primary": "#1d4ed8",

        background: "#0c1222",
        "on-background": "#e2e8f0",

        error: "#ef4444",
        "on-error": "#ffffff",
        "error-container": "#991b1b",
        "on-error-container": "#fecaca",

        outline: "#64748b",
        "outline-variant": "#334155",
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
