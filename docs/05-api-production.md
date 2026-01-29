# API Creation for Production (React + Strapi + Vercel)

## Stack

- **Frontend**: React (Vite), deployed on **Vercel**.
- **Backend / CMS**: **Strapi** (Node 20). Deploy Strapi on a Node host (e.g. Railway, Render, or VPS); Vercel is for the React app and optional serverless APIs.
- **Payments**: Stripe (backend creates sessions; frontend redirects).

## Production API Checklist

1. **Base URL from env**
   - Frontend: `VITE_STRAPI_URL=https://your-strapi.com`
   - All API calls use this (see `frontend/src/api/client.ts` or similar).

2. **CORS**
   - Strapi: In `config/middlewares.ts`, allow your Vercel frontend origin (e.g. `https://your-app.vercel.app`).

3. **Auth (if needed)**
   - Strapi: Use API tokens or users-permissions plugin.
   - Frontend: Store token (e.g. in memory or httpOnly cookie); send in `Authorization: Bearer <token>`.

4. **Errors and loading**
   - API layer returns typed responses or throws; UI shows loading/error states (see `frontend/src/hooks/`).

5. **Stripe**
   - Use env for `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` on backend; never in frontend.

## Where APIs Live

- **Strapi REST**: Auto-generated from content types.  
  - e.g. `GET /api/products`, `GET /api/products/:id`
- **Custom Strapi route**: e.g. `POST /api/payments/create-checkout-session` in `backend/src/api/payment/`.
- **Vercel serverless** (optional): `frontend/api/` or repo root `api/` with serverless functions that call Strapi or Stripe.

## Learning Path (1–2 Hours)

1. **0–20 min**: Run Strapi + React locally; call `GET /api/products` from `frontend/src/api/products.ts`.
2. **20–40 min**: Add one content type (e.g. `order`); add types in `frontend/src/types/` and a hook `useProducts`.
3. **40–60 min**: Add Stripe: backend route that creates Checkout Session; frontend “Pay” button that calls it and redirects.
4. **60–90 min**: Deploy frontend to Vercel; set `VITE_STRAPI_URL`; configure CORS on Strapi.
5. **90–120 min**: Deploy Strapi; test end-to-end; add a simple “Orders” list in React using `GET /api/orders`.

Use `docs/04-modular-context-window.md` so each step stays in one module for Cursor.
