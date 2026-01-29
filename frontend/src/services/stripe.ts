/**
 * Stripe service – business logic for checkout (context window: services).
 * Uses api/payments.ts; never puts secret key in frontend.
 */
import { createCheckoutSession } from '@/api/payments';

export async function redirectToCheckout(options: {
  amount: number;
  productId?: string | number;
  successPath?: string;
  cancelPath?: string;
}) {
  const base = window.location.origin;
  const session = await createCheckoutSession({
    amount: options.amount,
    currency: 'usd',
    productId: options.productId,
    successUrl: `${base}${options.successPath ?? '/success'}`,
    cancelUrl: `${base}${options.cancelPath ?? '/'}`,
  });
  if (session?.url) {
    window.location.href = session.url;
  } else {
    throw new Error('No checkout URL returned');
  }
}
