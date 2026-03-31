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
        "primary-container": "#ff6600",
        "surface": "#f2fbfc",
        "inverse-surface": "#293233",
        "on-surface": "#141d1e",
        "on-tertiary-fixed": "#00210b",
        "surface-variant": "#dbe4e5",
        "inverse-primary": "#ffb596",
        "secondary": "#3959b0",
        "primary": "#a33e00",
        "secondary-fixed": "#dbe1ff",
        "on-primary-container": "#561d00",
        "on-tertiary-container": "#003817",
        "error": "#ba1a1a",
        "surface-container-lowest": "#ffffff",
        "on-background": "#141d1e",
        "background": "#f2fbfc",
        "primary-fixed-dim": "#ffb596",
        "tertiary": "#006d33",
        "on-primary": "#ffffff",
        "primary-fixed": "#ffdbcd",
        "on-tertiary": "#ffffff",
        "on-surface-variant": "#5a4136",
        "tertiary-fixed": "#78fc9c",
        "on-error": "#ffffff",
        "outline-variant": "#e3bfb1",
        "on-tertiary-fixed-variant": "#005225",
        "surface-container-highest": "#dbe4e5",
        "outline": "#8e7164",
        "on-primary-fixed-variant": "#7c2e00",
        "surface-container-low": "#ecf5f6",
        "secondary-fixed-dim": "#b4c5ff",
        "on-secondary-fixed": "#00174b",
        "surface-container": "#e6f0f1",
        "secondary-container": "#84a2fe",
        "on-error-container": "#93000a",
        "surface-dim": "#d2dcdd",
        "on-secondary-fixed-variant": "#1c4197",
        "surface-container-high": "#e0eaeb",
        "tertiary-fixed-dim": "#5adf82",
        "error-container": "#ffdad6",
        "surface-bright": "#f2fbfc",
        "tertiary-container": "#17ad57",
        "on-secondary-container": "#09348b",
        "surface-tint": "#a33e00",
        "on-primary-fixed": "#360f00",
        "on-secondary": "#ffffff",
        "inverse-on-surface": "#e9f3f3"
      },
      fontFamily: {
        "headline": ["Inter"],
        "body": ["Inter"],
        "label": ["Inter"]
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
