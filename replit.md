# Bosques California Residencial

## Overview
A luxury real estate website for Bosques California residential development in Tlajomulco, Mexico. Built with React, TypeScript, and Vite.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6.0.8
- **Styling**: Tailwind CSS (via CDN)
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
├── components/
│   ├── Chat/          # Chat widget with AI integration
│   ├── Layout/        # Navbar, cursor, intro overlay
│   └── Pages/         # Home, Gallery, Models, Location, Forms
├── App.tsx            # Main application component
├── index.tsx          # Entry point
├── constants.ts       # App constants
├── types.ts           # TypeScript types
└── vite.config.ts     # Vite configuration
```

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` to build for production (outputs to `dist/`)

## Environment Variables
- `GEMINI_API_KEY`: Google Gemini API key for AI chat functionality (optional)

## Deployment
Configured for static deployment. The build output is in the `dist` directory.
