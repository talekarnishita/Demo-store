# Vercel + React + Strapi (Strapi for Context Management)

## Roles

- **Vercel**: Hosts the **React** frontend (and optionally serverless API routes).
- **Strapi**: Backend CMS and API (content types, auth, custom routes). Use it for “context management” in the sense of: **content and structured data** that drive the app (products, orders, pages, config).

## Strapi as “Context” Backend

- **Content types** = your data model (see `docs/03-data-modelling-schema.md`).
- **Admin UI** = manage content without code.
- **REST/GraphQL** = consumed by React; keep all calls in `frontend/src/api/` for clear context.

## Deployment Overview

| Part | Where | Notes |
|------|--------|------|
| React app | Vercel | Connect repo; build command e.g. `npm run build`; output `dist` (Vite). Set `VITE_STRAPI_URL`. |
| Strapi | Railway / Render / VPS | Node 20; needs DB (e.g. PostgreSQL). Set `DATABASE_*`, `STRIPE_*`, `APP_KEYS`, etc. |
| Stripe | Stripe Dashboard | Webhooks point to your Strapi or Vercel API URL. |

## Env per Environment

**Frontend (Vercel)**  
- `VITE_STRAPI_URL` – Strapi public URL (e.g. `https://api.yourproject.com`).  
- `VITE_STRIPE_PUBLISHABLE_KEY` – only if using Stripe.js on client.

**Strapi**  
- Database, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`.  
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` if payment routes live in Strapi.

## Quick Commands

- **Local React**: `cd frontend && npm run dev`  
- **Local Strapi**: `cd backend && npm run develop`  
- **Build for Vercel**: `cd frontend && npm run build`  
- **Strapi build**: `cd backend && npm run build` (for production deploy).

Keeping “context” in Strapi (content + schema) and “UI + API layer” in React (modular `api/`, `services/`, `types/`) keeps the system easy to work on with Cursor in 1–2 hour sessions.
