import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <section style={{ marginBottom: '3rem' }}>
        <h1 className="page-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          DEMO
        </h1>
        <p className="text-muted" style={{ maxWidth: '42rem', marginBottom: '1.5rem' }}>
          React + Strapi + Vercel + Stripe. Built with brownfield, agent model, context window,
          payment gateway, data modelling, and modular API patterns.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary">
            View products
          </Link>
          <Link to="/checkout-demo" className="btn btn-ghost">
            Checkout demo
          </Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">What’s in this stack</h2>
        <div className="product-grid" style={{ marginTop: '1rem' }}>
          <div className="card">
            <div className="card-title">Products</div>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
              List from Strapi API. Add and edit in Strapi Admin.
            </p>
            <Link to="/products" className="btn btn-ghost" style={{ marginTop: '0.75rem' }}>
              Open
            </Link>
          </div>
          <div className="card">
            <div className="card-title">Checkout</div>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
              Stripe Checkout flow. Backend creates session and redirects.
            </p>
            <Link to="/checkout-demo" className="btn btn-ghost" style={{ marginTop: '0.75rem' }}>
              Open
            </Link>
          </div>
          <div className="card">
            <div className="card-title">Docs</div>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
              Brownfield, context window, schema, API for production.
            </p>
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>
              See <code style={{ background: 'var(--color-border)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>docs/</code> in the repo.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
