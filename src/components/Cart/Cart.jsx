import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import CartItem from './CartItem';

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const Cart = () => {
  // CORRECCIÓN 1: Extraemos 'getTotal' en lugar de 'getTotalPrice'
  const { cart, clearCart, getTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <main style={{ display: 'grid', width: 'min(720px, calc(100% - 2rem))', minHeight: '60vh', margin: '0 auto', placeItems: 'center', padding: '3rem 0' }}>
        <section style={{ width: '100%', padding: '2.4rem', border: '1px solid rgba(103, 232, 249, 0.22)', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.7)', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '2.4rem' }}>💨</p>
          <h1 style={{ margin: '0.65rem 0 0', color: '#f8fafc', fontSize: '1.7rem' }}>Tu carrito está vacío 💨</h1>
          <p style={{ margin: '0.75rem 0 1.4rem', color: '#cbd5e1' }}>Explora nuestro catálogo y encuentra tu próximo favorito.</p>
          <Link to="/" style={{ display: 'inline-flex', padding: '0.75rem 1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #2563eb)', color: '#ffffff', fontWeight: 800, textDecoration: 'none' }}>
            Volver al catálogo
          </Link>
        </section>
      </main>
    );
  }

  // CORRECCIÓN 2: Ejecutamos la función 'getTotal()'
  const totalPrice = getTotal();

  return (
    <main style={{ width: 'min(1100px, calc(100% - 2rem))', margin: '0 auto', padding: '3rem 0 4rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, color: '#67e8f9', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Tu selección</p>
        <h1 style={{ margin: '0.4rem 0 0', color: '#f8fafc', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Carrito de compras</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 330px)', gap: '1.5rem', alignItems: 'start' }}>
        <section aria-label="Productos en el carrito" style={{ display: 'grid', gap: '0.9rem' }}>
          {cart.map((item) => <CartItem key={item.id} item={item} />)}
        </section>
        <aside style={{ padding: '1.35rem', border: '1px solid rgba(103, 232, 249, 0.2)', borderRadius: '18px', background: 'linear-gradient(145deg, rgba(8, 47, 73, 0.48), rgba(15, 23, 42, 0.88))', boxShadow: '0 18px 36px rgba(0, 0, 0, 0.2)' }}>
          <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.15rem' }}>Resumen de compra</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', margin: '1.35rem 0', paddingTop: '1.1rem', borderTop: '1px solid rgba(148, 163, 184, 0.18)' }}>
            <span style={{ color: '#cbd5e1', fontWeight: 700 }}>Total final</span>
            <strong style={{ color: '#a5f3fc', fontSize: '1.25rem' }}>{priceFormatter.format(totalPrice)}</strong>
          </div>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            <Link to="/checkout" style={{ display: 'inline-flex', justifyContent: 'center', padding: '0.8rem 1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #2563eb)', color: '#ffffff', fontWeight: 800, textDecoration: 'none' }}>
              Ir a Checkout
            </Link>
            <button type="button" onClick={clearCart} style={{ padding: '0.75rem 1rem', border: '1px solid rgba(251, 113, 133, 0.4)', borderRadius: '10px', background: 'rgba(136, 19, 55, 0.18)', color: '#fecdd3', cursor: 'pointer', fontWeight: 750 }}>
              Vaciar Carrito
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
