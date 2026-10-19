# Armanio portfolio

React + Vite portfolio homepage for Arman Dikmedzhyan.

## Development

Run `npm install`, then `npm run dev`.

## Deploy to Vercel

Import this repository in Vercel. `vercel.json` sets the Vite framework, `npm run build:vercel` build command, and `dist/client` output directory. No environment variables are required. Keep armanio.space on its current hosting until the new site is approved.

## Content and scope

- Homepage sections: `src/sections/`.
- Original layout reference: `src/source-layout.css`.
- Fluid CSS is generated before builds; edit its generator or source instead of the generated file.
- Typography, navigation buttons and the first portrait use original sizes at 1728px content width. Other project media scales independently.
- Desktop only for now; case studies link to the existing website.
- First and last portraits are static; project videos retain playback.

Local build verification of the latest sizing correction is pending; Vercel will run the build on import.
