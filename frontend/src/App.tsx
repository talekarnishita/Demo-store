import { Routes, Route, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { Cart } from './pages/Cart';
import { CheckoutDemo } from './pages/CheckoutDemo';

function App() {
  const { totalCount } = useCart();

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            DEMO
          </Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart" className="nav-cart">
              Cart
              {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
            </Link>
            <Link to="/checkout-demo">Checkout</Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-demo" element={<CheckoutDemo />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
