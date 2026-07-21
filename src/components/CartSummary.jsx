import { Link } from 'react-router-dom';

const CartSummary = ({ total, itemCount }) => (
  <aside className="cart-summary">
    <h3>Resumen</h3>
    <div className="cart-summary__row">
      <span>Productos</span>
      <span>{itemCount}</span>
    </div>
    <div className="cart-summary__row">
      <span>Total</span>
      <strong>${total.toLocaleString('es-CL')}</strong>
    </div>
    <Link to="/checkout" className="btn btn--primary">Checkout</Link>
  </aside>
);

export default CartSummary;
