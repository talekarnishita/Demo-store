/**
 * Custom route: POST /api/payments/create-checkout-session (Stripe Checkout).
 * Set STRIPE_SECRET_KEY in backend .env. See docs/02-payment-gateway.md.
 */
import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  prefix: '/payments',
  routes: [
    {
      method: 'POST',
      path: '/create-checkout-session',
      handler: 'api::payment.payment.createCheckoutSession',
      config: { auth: false },
    },
  ],
};

export default config;
