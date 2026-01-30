import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://propuesta-bosques-geo.replit.app', // Base URL for sitemap
    integrations: [
        react(),
        sitemap(),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
        tailwind(),
    ],
    vite: {
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        // Ensure we can use env vars
        define: {
            'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY)
        }
    },
});
