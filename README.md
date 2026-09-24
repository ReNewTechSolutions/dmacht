# DMacht

A modern Next.js website for **DMacht**, built to present industrial repair services, printer support, PCB repair, maintenance offerings, and U.S. launch positioning through a polished, responsive business site.

## Overview

DMacht is a service-focused industrial technology website designed for credibility, clarity, and conversion. The site introduces DMacht’s repair and maintenance capabilities with structured service pages, professional visuals, responsive layouts, and clear calls to action.

This project was built as a production-style business website using Next.js and modern frontend practices.

## Features

- Responsive Next.js website
- Service-focused landing pages
- Industrial printer repair content
- PCB repair and maintenance sections
- U.S. launch/service expansion pages
- Mobile navigation and responsive layouts
- Optimized image-driven sections
- Professional business branding and CTA structure

## Tech Stack

- Next.js
- React
- TypeScript
- CSS / module styling
- Vercel-ready deployment

## Project Structure

```txt
dmacht/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── ...
├── components/
├── public/
├── styles/
├── package.json
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Build

```bash
npm run build
```

## Production Notes

This project is structured as a business-facing website and can be extended with:

- service inquiry forms
- quote request workflows
- SEO landing pages
- analytics tracking
- CRM or email integrations
- multilingual support
- expanded service documentation

## Project Status

Active / in progress.

The site is being refined as part of the broader ReNewTech Solutions portfolio of client-facing and business development projects.

## Author

Built by **Felicia Goad** at [ReNewTech Solutions](https://renewtech.solutions)

Contact: [hello@renewtech.solutions](mailto:hello@renewtech.solutions)

## Brochure content and inventory

The September 2026 refinement uses `D-MACHT-compressed.pdf` for business content while retaining the light homepage design. The homepage is limited to the hero, three customer paths, brands and credibility strip. Technical details live on `/repair-service`, `/parts-consumables` and `/printers`; industries live on `/about#industries`.

- `data/site.ts`: shared brands, industries and contacts. Existing Pune location and support email were retained; brochure phone numbers and street address supplement them.
- `data/catalog.ts`: brochure page 4 part categories and the typed `PrinterListing` structure. Dee can add verified records to `printerInventory` with a unique ID, local photo path, alt text, brand, model, printer type, condition, specifications and availability. The empty array intentionally publishes no fictional inventory.
- Parts search filters the known category descriptions. Brand, model and part number are inquiry details, carried into the form for manual compatibility confirmation; there is no live stock feed.
- Inquiry forms open an email draft. Selected files remain local and must be attached manually, or shared with the inquiry through the device share sheet when file sharing is supported. The site does not store uploads or claim successful delivery. A receiving API/storage integration would be needed for server-side upload and receipt tracking.
- `.vercel/project.json` links the existing `dmacht` Vercel project. Release from the current branch after lint, build and browser verification; verify the production alias after deployment.

## Approved vector identity

- `public/brand/dmacht-logo.svg`: complete horizontal identity on About and a white footer inset so the approved navy lettering retains contrast.
- `public/brand/dmacht-logo-compact.svg`: mark + hyphen + MACHT, used in desktop/mobile navigation.
- `public/brand/dmacht-mark.svg`: isolated motion-D, used as the SVG favicon. The native wide symbol is centered without distortion inside the smallest square viewBox that contains it.

All three assets contain actual paths and vector gradients with transparent backgrounds, no raster images, no external references, and no runtime font dependency. `scripts/build-brand-assets.py` documents the reconstruction; it requires Python fontTools and the local Arial font only when regenerating the supporting lettering. The symbol and MACHT lettering use explicit vector geometry matched to the approved September 2026 reference. Supporting lettering uses outlined, dimension-matched local Arial.

## Social sharing and metadata

`lib/metadata.ts` supplies matching search, canonical, Open Graph and Twitter metadata for every content route, using `https://www.dmacht.com` as the canonical origin. Redirect-only routes retain their existing destinations. The old homepage canonical inheritance is replaced by route-specific canonical and social URLs.

The shared social asset is `public/brand/dmacht-social.png` (1200 × 630). It uses the compact SVG logo, two headline lines and the CIJ/TIJ/DOD supporting line. Serving the committed PNG needs no fonts, rendering service or network dependency. No automatic `opengraph-image`/`twitter-image` route is added because the existing explicit App Router metadata architecture covers both cards without duplicate declarations.

- Authoring: `scripts/build-social-image.py` composes the compact logo and outlined local Arial text into `scripts/dmacht-social-source.svg` (optional fontTools dependency).
- Rasterization: `node scripts/render-social-image.mjs` regenerates the PNG from the self-contained SVG using the installed Sharp package.
- Verification: after `npm run build`, run `node scripts/verify-metadata.mjs`; pass an origin to check a served deployment, e.g. `node scripts/verify-metadata.mjs https://www.dmacht.com`. This checks all seven content routes for duplicate/conflicting metadata, canonical URLs, card references and PNG dimensions; live checks also compare image bytes with the committed asset.

## Photography

See [the imagery audit and asset map](docs/PHOTOGRAPHY.md) for sources, placements, reference-edit prompts and optimization decisions. The homepage retains the Dee hero and three main paths, then adds four photo links below supported brands. The service page pairs six distinct images with repair capabilities; maintenance remains in its dedicated section. Parts browsing and inquiry behavior are preserved. Printer photography is explicitly illustrative, separate from real inventory data.

## Production environments

`/industries` is the consolidated application page for nine environments, with relevant links to Service, Parts and Printers. The homepage shows a three-image preview. See [industry imagery and QA](docs/INDUSTRIES.md) for sources, replacements, generation directions and optimization.

## Final simplification and SEO

See [the final editorial and SEO audit](docs/SITE-CLEANUP.md). Public content retains its existing URLs. The App Router now generates a seven-page sitemap and robots file. No new schema, fonts or client dependencies were added.
