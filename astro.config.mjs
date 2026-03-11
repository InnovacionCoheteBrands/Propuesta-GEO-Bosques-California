import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import { loadEnv } from 'vite';

// Load environment variables
const { GROK_API_KEY, GEMINI_API_KEY } = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
    site: 'https://propuesta-bosques-geo.replit.app', // Base URL for sitemap
    output: 'static', // Static pages + SSR for prerender=false pages
    adapter: node({
        mode: 'standalone',
    }),
    server: {
        host: '0.0.0.0',
        port: 5000,
        allowedHosts: true,
    },
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
        // Expose env vars to server-side code
        define: {
            'process.env.GROK_API_KEY': JSON.stringify(GROK_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(GEMINI_API_KEY),
            'process.env.API_KEY': JSON.stringify(GEMINI_API_KEY)
        }
    },
});
