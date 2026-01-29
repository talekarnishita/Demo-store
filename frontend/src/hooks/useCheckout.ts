/**
 * useCheckout – trigger Stripe checkout (context window: hooks).
 */
import { useState } from 'react';
import { redirectToCheckout } from '@/services/stripe';

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function checkout(amount: number, productId?: string | number) {
    setLoading(true);
    setError(null);
    try {
      await redirectToCheckout({ amount, productId });
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }

  return { checkout, loading, error };
}
