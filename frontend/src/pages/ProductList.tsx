import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { strapiMediaUrl } from '@/utils/strapiMedia';
import type { Product } from '@/types/product';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Number(price));
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const imageUrl = product.image?.url ? strapiMediaUrl(product.image.url) : null;

  return (
    <article className="product-card">
      <div style={{ aspectRatio: 1, background: 'var(--color-border)' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.image?.alternativeText ?? product.name}
            className="product-card-image"
          />
        ) : (
          <div
            className="product-card-image"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-muted)',
              fontSize: '0.875rem',
            }}
          >
            No image
          </div>
        )}
      </div>
      <div className="product-card-body">
        <h2 className="product-card-title">{product.name}</h2>
        <p className="product-card-price">{formatPrice(product.price)}</p>
        {product.description && (
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.875rem', lineHeight: 1.4 }}>
            {String(product.description).slice(0, 80)}
            {String(product.description).length > 80 ? '…' : ''}
          </p>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addItem(product)}
          style={{ width: '100%', marginTop: 'var(--space-md)' }}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="product-card" style={{ minHeight: 320 }}>
      <div className="skeleton" style={{ width: '100%', aspectRatio: 1 }} />
      <div className="product-card-body">
        <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 24, width: '40%' }} />
      </div>
    </div>
  );
}

export function ProductList() {
  const { products, loading, error } = useProducts();

  if (error) {
    return (
      <div className="error-state">
        <p className="page-title">Something went wrong</p>
        <p>{error.message}</p>
        <p className="text-muted" style={{ marginTop: '0.5rem' }}>
          Check that Strapi is running and CORS allows this origin.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Products</h1>

      {loading ? (
        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No products yet.</p>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>
            Add products (with images) in Strapi Admin → Content Manager → Product. See{' '}
            <code style={{ background: 'var(--color-border)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>docs/strapi-add-products.md</code> for steps.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.documentId ?? p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
