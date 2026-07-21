import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer';
import ItemListContainer from './components/ItemList/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import { CartProvider } from './context/CartContext';
import './styles/main.css';

const NotFoundPage = () => {
  return (
    <main style={{ display: 'grid', width: 'min(720px, calc(100% - 2rem))', minHeight: '65vh', margin: '0 auto', placeItems: 'center', padding: '3rem 0' }}>
      <section style={{ width: '100%', padding: '2.4rem', border: '1px solid rgba(103, 232, 249, 0.22)', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.7)', textAlign: 'center' }}>
        <p style={{ margin: 0, color: '#67e8f9', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.14em' }}>ERROR 404</p>
        <h1 style={{ margin: '0.55rem 0 0', color: '#f8fafc', fontSize: '2rem' }}>Página no encontrada</h1>
        <p style={{ margin: '0.75rem 0 1.35rem', color: '#cbd5e1' }}>La ruta que buscas no existe o fue movida.</p>
        <Link to="/" style={{ display: 'inline-flex', padding: '0.75rem 1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #2563eb)', color: '#ffffff', fontWeight: 800, textDecoration: 'none' }}>
          Volver al inicio
        </Link>
      </section>
    </main>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top left, #12213b 0%, #05070b 50%, #020304 100%)' }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
