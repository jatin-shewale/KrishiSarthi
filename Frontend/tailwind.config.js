/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#10B981', // Emerald 500 - Fresher, brighter green
                    light: '#34D399',   // Emerald 400
                    dark: '#059669',    // Emerald 600
                    deep: '#064E3B',    // Emerald 900 (for text/heavy contrast)
                },
                secondary: {
                    DEFAULT: '#F59E0B', // Amber 500 - Warm, sunny companion
                    light: '#FBBF24',   // Amber 400

                    dark: '#D97706',    // Amber 600
                },
                earth: {
                    50: '#ECFDF5',  // Very light mint
                    100: '#D1FAE5', // Light mint
                    200: '#A7F3D0',
                    900: '#064E3B', // Deep green for text
                },
                surface: '#F7FAFC',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            animation: {
                blob: "blob 7s infinite",
            },
            keyframes: {
                blob: {
                    "0%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                        transform: "translate(30px, -50px) scale(1.1)",
                    },
                    "66%": {
                        transform: "translate(-20px, 20px) scale(0.9)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                },
            },
        },
    },
    plugins: [],
}
