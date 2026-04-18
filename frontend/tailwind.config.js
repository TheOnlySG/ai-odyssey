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
                "error": "#ffb4ab",
                "on-tertiary-fixed-variant": "#005137",
                "on-surface": "#e4e1e9",
                "surface-container-highest": "#35343a",
                "on-tertiary": "#003825",
                "surface": "#131318",
                "on-primary-fixed-variant": "#5a00c6",
                "surface-bright": "#39383e",
                "secondary-container": "#03b5d3",
                "on-primary-fixed": "#25005a",
                "surface-container": "#1f1f24",
                "tertiary-fixed": "#68fcbf",
                "on-surface-variant": "#ccc3d8",
                "on-secondary-fixed-variant": "#004e5c",
                "surface-dim": "#131318",
                "on-error-container": "#ffdad6",
                "on-error": "#690005",
                "on-tertiary-fixed": "#002114",
                "on-tertiary-container": "#6bffc1",
                "secondary-fixed-dim": "#4cd7f6",
                "on-primary": "#3f008e",
                "primary-container": "#7c3aed",
                "inverse-on-surface": "#303035",
                "surface-tint": "#d2bbff",
                "tertiary-fixed-dim": "#45dfa4",
                "outline": "#958da1",
                "error-container": "#93000a",
                "on-secondary-fixed": "#001f26",
                "surface-container-high": "#2a292f",
                "primary-fixed-dim": "#d2bbff",
                "primary-fixed": "#eaddff",
                "on-secondary": "#003640",
                "tertiary": "#45dfa4",
                "on-background": "#e4e1e9",
                "surface-variant": "#35343a",
                "on-secondary-container": "#00424e",
                "outline-variant": "#4a4455",
                "on-primary-container": "#ede0ff",
                "primary": "#d2bbff",
                "inverse-primary": "#732ee4",
                "surface-container-lowest": "#0e0e13",
                "secondary-fixed": "#acedff",
                "background": "#131318",
                "tertiary-container": "#007551",
                "secondary": "#4cd7f6",
                "inverse-surface": "#e4e1e9",
                "surface-container-low": "#1b1b20"
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            fontFamily: {
                "headline": ["Plus Jakarta Sans", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "label": ["Inter", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"]
            },
            backgroundImage: {
                'dot-grid': 'radial-gradient(circle, #39383e 1px, transparent 1px)',
            },
            keyframes: {
                slideRight: {
                    '0%': { transform: 'scaleX(0)' },
                    '50%': { transform: 'scaleX(1)' },
                    '100%': { transform: 'scaleX(0)', transformOrigin: 'right' }
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                }
            },
            animation: {
                'slideRight': 'slideRight 1.5s ease-in-out infinite',
                'fadeIn': 'fadeIn 0.5s ease-out forwards'
            }
        }
    },
    plugins: [],
  }
