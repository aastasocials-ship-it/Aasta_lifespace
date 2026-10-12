# Aasta Lifespace

Marketing site for Aasta Lifespace (https://aastalifespace.com), built with Vite, React, TypeScript, Tailwind CSS and shadcn/ui.

## Development

Requires Node.js 18+.

```sh
npm install
npm run dev      # http://localhost:8080
```

## Scripts

- `npm run build` – production build to `dist/`
- `npm run preview` – serve the production build locally
- `npm run lint` – ESLint
- `npm test` – Vitest

## Deployment

Hosted on Vercel (`vercel.json`). Pushing to `main` deploys production; other branches get preview URLs. All paths are rewritten to `index.html` so client-side routes (e.g. `/projects/...`, `/blog/...`) work on refresh.
