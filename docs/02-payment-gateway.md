# Payment Gateway (Stripe) Integration

## Can I use another gateway (PayPal, Razorpay, etc.)?

Yes. The same pattern applies: **frontend calls your backend**, your **backend** talks to the gateway with secret keys, and returns a URL or token to the frontend. Replace the Strapi payment controller logic with the other gateway’s SDK (e.g. PayPal orders create, Razorpay order create). Keep the frontend flow: “call backend → get URL/token → redirect or show UI.”

## Overview (Stripe)

This project uses **Stripe** for payments. The pattern is:

- **Frontend (React)**: Create Checkout Session or PaymentIntent via your **backend** (never expose Stripe secret key in the browser).
- **Backend**: Either a small **API route on Vercel** (e.g. serverless) or **Strapi custom route** that calls Stripe with the secret key.

## Why Backend?

- Stripe **secret key** must never be in client-side code.
- Idempotency and validation (e.g. amount, currency) must be done server-side.

## Flow (Checkout Session)

1. User clicks “Pay” → frontend calls `POST /api/payments/create-checkout-session` (Strapi custom route).
2. Backend creates a Stripe Checkout Session with `stripe.checkout.sessions.create()`.
3. Backend returns `{ url: session.url }`.
4. Frontend redirects: `window.location.href = url`.

## Environment Variables

- **Backend / Vercel serverless**:
  - `STRIPE_SECRET_KEY=sk_test_...`
  - `STRIPE_WEBHOOK_SECRET=whsec_...` (for webhooks)
- **Frontend**:
  - Only **publishable key** if you use Stripe.js (e.g. Elements): `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`

## Files in This Repo

- `frontend/src/services/stripe.ts` – calls your backend to create a session.
- `frontend/src/api/payments.ts` – API client for payment endpoints.
- Backend: `backend/src/api/payment/` – custom route `POST /api/payments/create-checkout-session` and controller. Set **STRIPE_SECRET_KEY** in `backend/.env` and run `npm install` in backend (Stripe is in package.json). Restart Strapi after adding the env var.

## Schema Tie-In

Orders or payments can be stored in Strapi (e.g. content type `order` with `stripeSessionId`, `status`, `amount`). See `docs/03-data-modelling-schema.md`.
