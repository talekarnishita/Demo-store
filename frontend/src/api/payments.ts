/**
 * Payment API – create checkout session (calls Strapi custom route or Vercel serverless).
 * See docs/02-payment-gateway.md.
 */
import { apiFetch } from './client';

export interface CreateCheckoutParams {
  amount: number;
  currency?: string;
  productId?: string | number;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateCheckoutResponse {
  url: string;
}

export async function createCheckoutSession(
  params: CreateCheckoutParams
): Promise<CreateCheckoutResponse> {
  return apiFetch<CreateCheckoutResponse>('/api/payments/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
