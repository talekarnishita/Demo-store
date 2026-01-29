# Frontend (React + Vite, Vercel-ready)

Modular structure for Cursor context window: `api/`, `services/`, `types/`, `hooks/`, `pages/`.

## Setup

```bash
cp .env.example .env
# Edit .env: VITE_STRAPI_URL=http://localhost:1337 (or your Strapi URL)
npm install
npm run dev
```

## Build (Vercel)

```bash
npm run build
```

Output: `dist/`. Set `VITE_STRAPI_URL` in Vercel env.

## Strapi v5 response shape

If your Strapi returns a different shape (e.g. nested `attributes`), adjust `src/types/product.ts` and the API layer in `src/api/products.ts` to map the response to `Product`.
