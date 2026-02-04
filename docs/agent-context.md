# Project context for agents

Use this as the canonical context when starting work on this repo. Load it at the start of a session so the agent has full project context.

## Project

- **Name:** DEMO (repo: demo-store)
- **What it is:** React + Strapi + Stripe demo with products, cart, and checkout. BMAD-style docs for brownfield, context window, and modular API.

## Tech stack (one line each)

- **React** – UI (products, cart, checkout).
- **Vite** – Frontend dev/build.
- **TypeScript** – Frontend types.
- **React Router** – Routes (Home, Products, Cart, Checkout).
- **Strapi** – Backend CMS/API (Node 20): Product, Payment content types; Stripe route at `POST /api/payments/create-checkout-session`.
- **Stripe** – Payments (checkout sessions).
- **Scrapy** – Optional Python scraping.
- **Vercel** – Frontend deploy.

## Repo structure

| Path | Purpose |
|------|--------|
| **frontend/** | React app. `src/api/` = API calls; `src/context/` = Cart; `src/pages/` = Home, Products, Cart, Checkout; `src/services/`, `src/types/`, `src/hooks/`, `src/utils/`. |
| **backend/** | Strapi. `src/api/product/`, `src/api/payment/` (Stripe route); `config/`. |
| **docs/** | BMAD-style docs. Index: `docs/00-index.md`. This file: `docs/agent-context.md`. |
| **scraper/** | Scrapy. `scraper/spiders/`, `scraper/items.py`, `scraper/pipelines.py`. |

## Flow

1. Add products (with images) in Strapi Admin → Content Manager → Product.
2. Frontend Products page lists from Strapi; Add to cart.
3. Cart page: adjust quantity, remove; Checkout uses cart total.
4. Checkout → Stripe; pay with test card `4242 4242 4242 4242`.

## Context window / modular rules

- **One task = one module.** When changing “API calls”, open `frontend/src/api/` + relevant doc. When changing “payment”, open `backend/src/api/payment/` + `docs/02-payment-gateway.md`.
- **Doc index:** `docs/00-index.md` – lists all docs and direct folder links. Use the doc that matches the task.
- **Brownfield:** Treat this as an existing codebase; change one module at a time; keep docs accurate.

## Env

- **Frontend:** `VITE_STRAPI_URL` (optional in dev; Vite proxies to 1337).
- **Backend:** `STRIPE_SECRET_KEY` in `backend/.env` for checkout.

## Quick commands

- Run Strapi: `cd backend && npm run develop`
- Run frontend: `cd frontend && npm run dev`
- Node 20: `nvm use` (from root)

Adopt this context for the session. For any task, open the relevant doc from `docs/00-index.md` and the folder you are editing.
