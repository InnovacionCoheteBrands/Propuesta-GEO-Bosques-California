/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                navy: '#1E3D2F', // Deep Forest Green (Primary)
                sage: '#8F9B86', // Lighter Sage/Olive (Secondary)
                gold: '#C5A059', // Soft Gold/Sand (Accent)
                'off-white': '#F5F5F0', // Warm Alabaster (Background)
                'text-main': '#2C332D', // Dark Green-Grey (Text)
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        }
    },
    plugins: [],
}
