# forte-web

Forte — CV evaluation, mock interviews, and guided revision. Next.js frontend.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`) |
| Runtime | React 19 |
| Lint | ESLint 9 + `eslint-config-next` |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Architecture

Routes live in `app/` and contain almost no markup — each page composes
feature modules. Shared, domain-agnostic UI lives in `components/`;
domain-aware UI and its hooks live beside each other in `features/`.

```
app/          route segments + layouts only
components/   shared UI primitives (ui/, layout/, brand/, providers/)
features/     domain modules — components + hooks, colocated
lib/          data access, http client, env
constants/    static option lists and copy
types/        shared domain types
utils/        pure helpers
```

See [`docs/architecture.md`](docs/architecture.md) for the full breakdown.

## Design source

The reference design is checked in at [`.design/Forte App.dc.html`](.design/Forte%20App.dc.html).
