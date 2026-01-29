import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { strapiMediaUrl } from '@/utils/strapiMedia';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Number(price));
}

export function Cart() {
  const { items, totalCount, totalAmount, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate('/checkout-demo', { state: { amount: totalAmount } });
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p className="page-title">Your cart is empty</p>
        <p className="text-muted" style={{ marginTop: '0.25rem' }}>
          Add products from the <Link to="/products">Products</Link> page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Cart ({totalCount} {totalCount === 1 ? 'item' : 'items'})</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {items.map(({ product, quantity }) => {
          const id = product.documentId ?? product.id;
          const imageUrl = product.image?.url ? strapiMediaUrl(product.image.url) : null;
          const lineTotal = Number(product.price) * quantity;

          return (
            <div
              key={id}
              className="card"
              style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, background: 'var(--color-border)' }}>
                {imageUrl ? (
                  <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', fontSize: '0.75rem' }}>No image</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="card-title" style={{ marginBottom: '0.25rem' }}>{product.name}</div>
                <p className="product-card-price" style={{ margin: 0 }}>{formatPrice(product.price)} each</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <label htmlFor={`qty-${id}`} className="text-muted" style={{ fontSize: '0.875rem' }}>Qty</label>
                <input
                  id={`qty-${id}`}
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => updateQuantity(id, Math.max(1, parseInt(e.target.value, 10) || 1))}
                  style={{
                    width: 56,
                    padding: 'var(--space-xs) var(--space-sm)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{formatPrice(lineTotal)}</div>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => removeItem(id)}
                style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: '0.8rem' }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ maxWidth: 360 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
          <span className="section-title" style={{ margin: 0 }}>Total</span>
          <span className="product-card-price" style={{ fontSize: '1.25rem' }}>{formatPrice(totalAmount)}</span>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={goToCheckout}
          style={{ width: '100%', padding: '0.75rem 1rem' }}
        >
          Checkout
        </button>
        <Link to="/products" className="btn btn-ghost" style={{ width: '100%', marginTop: '0.5rem', textAlign: 'center' }}>
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
