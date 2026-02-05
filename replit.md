# Bosques California Residencial

## Overview
A luxury real estate website for Bosques California residential development in Tlajomulco, Mexico. Built with **Astro**, React, and TypeScript.

## Tech Stack
- **Framework**: Astro 5.x (SSG/SSR)
- **UI**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion, Lenis (smooth scroll)
- **AI Integration**: Google Gemini API (for chat widget)

## Branding (aligned with bosquescalifornia.com)
- **Primary Gold**: #EBB37D
- **Accent Blue**: #2098D1
- **Background**: #FFFFFF (white)
- **Text**: #000000 (black)
- **Heading Font**: Raleway
- **Body Font**: Open Sans

## Project Structure
```
/
├── src/
│   ├── components/    # React components
│   │   ├── Chat/      # Chat widget with AI integration
│   │   ├── Layout/    # Navbar, cursor, intro overlay
│   │   └── Pages/     # Home, Gallery, Models, Location, Forms
│   ├── layouts/       # Astro layouts
│   ├── pages/         # Astro pages (file-based routing)
│   └── styles/        # Global CSS
├── public/            # Static assets
├── astro.config.mjs   # Astro configuration
└── package.json
```

## Development
- Run `npm run dev` to start the development server on **port 5000**
- Run `npm run build` to build for production (outputs to `dist/`)

## Environment Variables
Set these in Replit Secrets:
- `GEMINI_API_KEY`: Google Gemini API key for AI chat functionality

## Deployment
Configured for static deployment. The build output is in the `dist` directory.
