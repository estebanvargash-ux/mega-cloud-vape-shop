import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { cart, removeItem, clearCart, getTotal, totalItems, updateItemQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <main className="page page--center">
        <div className="empty-state">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra.</p>
          <Link to="/" className="btn btn--primary">Explorar productos</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page__header">
        <p className="section__eyebrow">Carrito</p>
        <h1>Tu pedido</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-list">
          <button type="button" className="btn btn--ghost" onClick={clearCart}>Vaciar carrito</button>
          <ul>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeItem} onQuantityChange={updateItemQuantity} />
            ))}
          </ul>
        </div>
        <CartSummary total={getTotal()} itemCount={totalItems} />
      </div>
    </main>
  );
};

export default Cart;
