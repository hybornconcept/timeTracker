/** @type {import('tailwindcss').Config}*/
const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],


    theme: {
        extend: {
            colors: { // flowbite-svelte
                primary: {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#64748b",
                    "600": "#475569",
                    "700": "#334155",
                    "800": "#1 e293b",
                    "900": "#0f172a"
                }
            }
        }
    },
    plugins: [require('flowbite/plugin')]
};

module.exports = config;
