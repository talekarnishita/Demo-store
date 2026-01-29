/**
 * Payment controller – create Stripe Checkout Session.
 * Set STRIPE_SECRET_KEY in backend .env.
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  async createCheckoutSession(ctx) {
    const body = ctx.request.body ?? {};
    const amount = body.amount as number | undefined;
    const successUrl = body.successUrl as string | undefined;
    const cancelUrl = body.cancelUrl as string | undefined;
    const currency = (body.currency as string) ?? 'usd';
    const productId = body.productId as string | number | undefined;

    if (amount == null || !successUrl || !cancelUrl) {
      return ctx.badRequest('Missing amount, successUrl, or cancelUrl');
    }

    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return ctx.badRequest('STRIPE_SECRET_KEY is not set on the server');
    }

    const stripe = require('stripe')(stripeSecret);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: Math.round(Number(amount) * 100),
            product_data: { name: 'Order' },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { productId: String(productId ?? '') },
    });

    ctx.body = { url: session.url };
  },
}));
