import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { createOrder } from '../services/FirestoreService';
import { useCart } from '../hooks/useCart';

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <main className="page page--center">
        <div className="empty-state">
          <h2>No hay productos para comprar</h2>
          <p>Agrega productos al carrito antes de finalizar tu compra.</p>
          <Link to="/" className="btn btn--primary">Volver al catálogo</Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (buyer) => {
    try {
      setIsSubmitting(true);
      setError('');

      const orderData = {
        buyer,
        items: cart.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
        total: getTotal(),
        date: new Date().toISOString(),
        status: 'pending',
      };

      const result = await createOrder(orderData);
      clearCart();
      navigate('/order-success', { state: { orderId: result.orderId, total: result.total, items: result.items.length } });
    } catch (err) {
      console.error(err);
      setError('No pudimos procesar tu pedido. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page">
      <div className="page__header">
        <p className="section__eyebrow">Checkout</p>
        <h1>Finaliza tu compra</h1>
      </div>
      <div className="checkout-layout">
        {error && <p className="checkout-form__error">{error}</p>}
        <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        <aside className="checkout-summary">
          <h3>Tu pedido</h3>
          {cart.map((item) => (
            <div key={item.id} className="checkout-summary__item">
              <span>{item.name}</span>
              <span>{item.quantity} × ${item.price.toLocaleString('es-CL')}</span>
            </div>
          ))}
          <div className="checkout-summary__total">
            <strong>Total</strong>
            <strong>${getTotal().toLocaleString('es-CL')}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
