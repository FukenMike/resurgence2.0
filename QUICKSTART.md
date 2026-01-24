# Quick Start

This project now runs entirely on static data—no environment keys or database setup required.

## Run locally
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the dev server
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` and navigate to **Resources → Resource Directory**.

## Data source
- Directory listings come from `src/data/resourceLinks.ts`.
- Each item uses the `ResourceLink` shape in `src/lib/types.ts`.
- Update or add entries and the page will render them immediately (no fetch needed).

## Available scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview build
- `npm run lint` – type-check

## Notes
- No `.env` file is required.
- Directory cards open external links in a new tab.
