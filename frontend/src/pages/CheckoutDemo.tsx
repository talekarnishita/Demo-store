import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCheckout } from '@/hooks/useCheckout';

const PRESET_AMOUNTS = [
  { label: '$9.99', value: 9.99 },
  { label: '$19.99', value: 19.99 },
  { label: '$49.99', value: 49.99 },
  { label: '$99.99', value: 99.99 },
];

export function CheckoutDemo() {
  const { state } = useLocation() as { state?: { amount?: number } };
  const { checkout, loading, error } = useCheckout();
  const [selectedAmount, setSelectedAmount] = useState(19.99);

  useEffect(() => {
    if (state?.amount != null && state.amount > 0) {
      setSelectedAmount(state.amount);
    }
  }, [state?.amount]);

  const handlePay = () => {
    checkout(selectedAmount); // hook expects dollars
  };

  return (
    <div>
      <h1 className="page-title">Checkout demo</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
        Opens Stripe Checkout. Requires Strapi payment route and <code style={{ background: 'var(--color-border)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>STRIPE_SECRET_KEY</code> in backend.
      </p>

      <div className="card checkout-card">
        <div className="section-title">Amount</div>
        <div className="checkout-amounts">
          {PRESET_AMOUNTS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              className={`amount-chip ${selectedAmount === value ? 'active' : ''}`}
              onClick={() => setSelectedAmount(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          disabled={loading}
          onClick={handlePay}
          style={{ width: '100%', padding: '0.75rem 1rem' }}
        >
          {loading ? 'Redirecting to Stripe…' : `Pay ${selectedAmount.toFixed(2)}`}
        </button>
        {error && (
          <p className="text-muted" style={{ marginTop: '1rem', color: 'var(--color-error)', fontSize: '0.875rem' }}>
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
