# DEMO

React + Strapi + Stripe demo with cart and checkout. BMAD-style docs for brownfield, agent model, context window, data modelling, and modular API patterns.

## What’s in this repo

- **`frontend/`** – React (Vite) app: products list, **cart**, checkout. Vercel-ready.
  - `src/api/` – Strapi & payment API calls
  - `src/context/` – Cart state (add, remove, quantity, total)
  - `src/pages/` – Home, Products, **Cart**, Checkout
  - `src/services/`, `src/types/`, `src/hooks/` – business logic, types, data hooks
- **`backend/`** – Strapi (Node 20): Product & Payment content types, **Stripe checkout route** at `POST /api/payments/create-checkout-session`.
- **`docs/`** – Brownfield, agent model, context window, payment gateway, data modelling, modular API, Vercel/Strapi, Scrapy. Plus **`docs/strapi-add-products.md`** for adding products with images.
- **`scraper/`** – Scrapy (Python): optional web scraping. See **docs/07-scrapy-integration.md**.

## Flow: products → cart → checkout

1. **Add products (with images) in Strapi** → Content Manager → Product → Create entry, set name, price, image, Save & Publish. See **docs/strapi-add-products.md**.
2. **Products** (frontend) → list from Strapi; **Add to cart** on each product.
3. **Cart** → view items, change quantity, remove; **Checkout** uses cart total.
4. **Checkout** → redirects to Stripe; pay with test card `4242 4242 4242 4242`.

## Prerequisites

- **Node 20** (Strapi). From repo root: `nvm use` or `nvm install 20 && nvm use 20`.
- **Python 3.8+** (optional, for Scrapy).
- **Stripe** test key in `backend/.env`: `STRIPE_SECRET_KEY=sk_test_...` for checkout.

---

## How to run (local)

### 1. Backend (Strapi) – Terminal 1

```bash
nvm use
cd backend
npm run develop
```

- API: **http://localhost:1337**
- Admin: **http://localhost:1337/admin** (log in, add products with images; enable Public `find`/`findOne` for Product in Settings → Users & Permissions).

### 2. Frontend – Terminal 2

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

- App: **http://localhost:5173**

### 3. Optional – Scrapy

```bash
cd scraper
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
scrapy crawl example -o output.json
```

---

## Quick reference

| What          | URL / command                                      |
|---------------|----------------------------------------------------|
| Frontend      | http://localhost:5173                              |
| Strapi API    | http://localhost:1337                              |
| Strapi Admin  | http://localhost:1337/admin                        |
| Add products  | Strapi Admin → Content Manager → Product          |
| Cart & pay    | Products → Add to cart → Cart → Checkout → Stripe |

## Commands

| Task           | Command                          |
|----------------|----------------------------------|
| Node 20        | `nvm use` (from root)            |
| Run Strapi     | `cd backend && npm run develop` |
| Run frontend   | `cd frontend && npm run dev`     |
| Build (Vercel) | `cd frontend && npm run build`   |
| Deploy (Railway) | See **docs/09-railway-deployment.md** (monorepo: backend + frontend + PostgreSQL). |

## Env

- **Frontend** (`.env` / Vercel): `VITE_STRAPI_URL` (optional in dev; Vite proxies to 1337).
- **Backend** (Strapi): `STRIPE_SECRET_KEY` for checkout. Other Strapi vars in `.env.example`.

---

## Cursor & context window

- One task = one module. Open the relevant doc (e.g. `docs/04-modular-context-window.md`) and folder (`api/`, `context/`, etc.).
- Doc index: **docs/00-index.md**.

For payment, schema, and deployment details, see **docs/02-payment-gateway.md**, **docs/03-data-modelling-schema.md**, **docs/06-vercel-react-strapi.md**, and **docs/09-railway-deployment.md**.
