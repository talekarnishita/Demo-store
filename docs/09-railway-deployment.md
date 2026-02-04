# Deploy on Railway

Deploy the DEMO monorepo (frontend + backend) on Railway using one repo and two services. Backend uses PostgreSQL on Railway; frontend is static (Vite build + serve).

## Prerequisites

- [Railway](https://railway.app) account
- Repo pushed to GitHub (or connected to Railway)

## 1. Create project and add PostgreSQL

1. **New Project** in Railway.
2. **Add PostgreSQL** (or **New** → **Database** → **PostgreSQL**). Railway will create a Postgres service and expose `DATABASE_URL` (or `POSTGRES_URL`).
3. Note the Postgres URL for the backend env (you can reference it as a variable after linking the backend service).

## 2. Deploy backend (Strapi)

1. **New Service** → **Deploy from GitHub** (or **Empty** and connect repo).
2. Select this repo.
3. **Settings** for the backend service:
   - **Root directory:** `backend`
   - **Config file path (optional):** leave default so Railway finds `backend/railway.toml` when building from `backend/`.
4. **Variables** (backend service). Add:

   | Variable | Value / note |
   |----------|----------------|
   | `NODE_ENV` | `production` |
   | `HOST` | `0.0.0.0` |
   | `PORT` | Leave unset; Railway sets it (Strapi uses `env.int('PORT', 1337)` in `config/server.ts`). |
   | `DATABASE_CLIENT` | `postgres` |
   | `DATABASE_URL` | Reference from Postgres service (e.g. `${{Postgres.DATABASE_URL}}` or the variable name Railway shows). |
   | `APP_KEYS` | Comma-separated keys (e.g. `key1,key2`). Generate random strings. |
   | `API_TOKEN_SALT` | Random string |
   | `ADMIN_JWT_SECRET` | Random string |
   | `TRANSFER_TOKEN_SALT` | Random string |
   | `JWT_SECRET` | Random string |
   | `ENCRYPTION_KEY` | Random string |
   | `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` |

5. **Deploy.** After deploy, open the backend service → **Settings** → **Networking** → **Generate domain**. Note the URL (e.g. `https://your-backend.up.railway.app`).

## 3. Deploy frontend (React/Vite)

1. In the same (or another) project: **New Service** → **Deploy from GitHub** → same repo.
2. **Settings** for the frontend service:
   - **Root directory:** `frontend`
3. **Variables** (frontend service):

   | Variable | Value |
   |----------|--------|
   | `VITE_STRAPI_URL` | Backend URL from step 2 (e.g. `https://your-backend.up.railway.app`). No trailing slash. |

4. **Deploy.** Railway will run `npm install && npm run build` then `npm run start` (serve `dist` on `PORT`). Generate a domain for the frontend (e.g. `https://your-frontend.up.railway.app`).

## 4. CORS and Stripe

- **Strapi Admin** → **Settings** → **API** (or **Middleware**) → **CORS**: add your frontend Railway URL (e.g. `https://your-frontend.up.railway.app`).
- Stripe success/cancel URLs: use the frontend URL (your app already uses `window.location.origin` for base, so in production it will be the Railway frontend domain).

## 5. Config in repo

- **Backend:** `backend/railway.toml` – build and start commands; used when Root Directory is `backend`.
- **Frontend:** `frontend/railway.toml` – same for `frontend`.
- **Backend:** `pg` in `package.json` for PostgreSQL; `config/database.ts` already supports `DATABASE_CLIENT=postgres` and `DATABASE_URL`.
- **Frontend:** `serve` in `package.json` and `"start": "serve dist -s -l ${PORT:-3000}"` for static serving on Railway.

## 6. Monorepo summary

| Service | Root directory | Build | Start | Main env |
|---------|----------------|--------|--------|----------|
| Backend | `backend` | `npm install && npm run build` | `npm run start` | `DATABASE_CLIENT`, `DATABASE_URL`, Strapi keys, `STRIPE_SECRET_KEY` |
| Frontend | `frontend` | `npm install && npm run build` | `npm run start` | `VITE_STRAPI_URL` |

One repo, two Railway services; no need to split into separate repos.

## Related docs

- [06 – Vercel + React + Strapi](06-vercel-react-strapi.md) – alternative deploy (Vercel frontend, Strapi elsewhere).
- [05 – API for production](05-api-production.md) – CORS, env, learning path.
- [02 – Payment gateway](02-payment-gateway.md) – Stripe env and flow.
