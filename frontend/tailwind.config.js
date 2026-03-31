/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container": "var(--color-primary-container)",
        "surface": "var(--color-surface)",
        "inverse-surface": "var(--color-inverse-surface)",
        "on-surface": "var(--color-on-surface)",
        "on-tertiary-fixed": "var(--color-on-tertiary-fixed)",
        "surface-variant": "var(--color-surface-variant)",
        "inverse-primary": "var(--color-inverse-primary)",
        "secondary": "var(--color-secondary)",
        "primary": "var(--color-primary)",
        "secondary-fixed": "var(--color-secondary-fixed)",
        "on-primary-container": "var(--color-on-primary-container)",
        "on-tertiary-container": "var(--color-on-tertiary-container)",
        "error": "var(--color-error)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "on-background": "var(--color-on-background)",
        "background": "var(--color-background)",
        "primary-fixed-dim": "var(--color-primary-fixed-dim)",
        "tertiary": "var(--color-tertiary)",
        "on-primary": "var(--color-on-primary)",
        "primary-fixed": "var(--color-primary-fixed)",
        "on-tertiary": "var(--color-on-tertiary)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "tertiary-fixed": "var(--color-tertiary-fixed)",
        "on-error": "var(--color-on-error)",
        "outline-variant": "var(--color-outline-variant)",
        "on-tertiary-fixed-variant": "var(--color-on-tertiary-fixed-variant)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "outline": "var(--color-outline)",
        "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",
        "surface-container-low": "var(--color-surface-container-low)",
        "secondary-fixed-dim": "var(--color-secondary-fixed-dim)",
        "on-secondary-fixed": "var(--color-on-secondary-fixed)",
        "surface-container": "var(--color-surface-container)",
        "secondary-container": "var(--color-secondary-container)",
        "on-error-container": "var(--color-on-error-container)",
        "surface-dim": "var(--color-surface-dim)",
        "on-secondary-fixed-variant": "var(--color-on-secondary-fixed-variant)",
        "surface-container-high": "var(--color-surface-container-high)",
        "tertiary-fixed-dim": "var(--color-tertiary-fixed-dim)",
        "error-container": "var(--color-error-container)",
        "surface-bright": "var(--color-surface-bright)",
        "tertiary-container": "var(--color-tertiary-container)",
        "on-secondary-container": "var(--color-on-secondary-container)",
        "surface-tint": "var(--color-surface-tint)",
        "on-primary-fixed": "var(--color-on-primary-fixed)",
        "on-secondary": "var(--color-on-secondary)",
        "inverse-on-surface": "var(--color-inverse-on-surface)"
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "body": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "label": ["Plus Jakarta Sans", "system-ui", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      }
    }
  },
  plugins: [],
}
