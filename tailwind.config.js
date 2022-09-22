/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./common/components/**/*.{js,ts,jsx,tsx}",
        "./screens/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
            },
        },
        colors: {
            transparent: colors.transparent,
            slate: colors.slate,
            neutral: colors.neutral,
            "light-teal": "#6ee7b7",
            teal: "#2dd4bf",
            "dark-teal": "#14b8a6",
            blue: "#3b82f6",
            "dark-blue": "#2563eb",
            "light-red": "#f87171",
            red: "#f87171",
            "dark-red": "#ef4444",
            yellow: "#facc15",
        },
    },
    plugins: [],
};
