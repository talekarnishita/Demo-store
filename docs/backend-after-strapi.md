# After creating Strapi: add payment route (optional)

Once you’ve run `npx create-strapi-app@latest . --quickstart` inside `backend/`, you can add a custom Stripe payment route.

## 1. Install Stripe in backend

```bash
cd backend
npm install stripe
```

## 2. Create the payment API in Strapi

In Strapi 5 you can add a custom route. Create (or use Strapi’s way of registering custom routes):

**`backend/src/api/payment/routes/payment.ts`** (or the equivalent in your Strapi version):

```ts
export default {
  routes: [
    {
      method: 'POST',
      path: '/payments/create-checkout-session',
      handler: 'payment.createCheckoutSession',
    },
  ],
};
```

**`backend/src/api/payment/controllers/payment.ts`**:

```ts
export default {
  async createCheckoutSession(ctx) {
    const { amount, currency = 'usd', successUrl, cancelUrl, productId } = ctx.request.body ?? {};
    if (!amount || !successUrl || !cancelUrl) {
      return ctx.badRequest('Missing amount, successUrl, or cancelUrl');
    }
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price_data: { currency, unit_amount: Math.round(amount * 100) }, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { productId: productId ?? '' },
    });
    ctx.body = { url: session.url };
  },
};
```

**`backend/src/api/payment/services/payment.ts`**:

```ts
export default () => ({});
```

## 3. Register the route

Follow your Strapi version’s docs for custom API routes (e.g. bootstrap or plugin). Set `STRIPE_SECRET_KEY` in `backend/.env`.

See **docs/02-payment-gateway.md** for the full flow and frontend usage.
