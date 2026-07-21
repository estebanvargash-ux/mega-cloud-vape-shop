import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import CartContext from '../../context/CartContext';
import { db } from '../../services/firebaseConfig';

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const initialBuyer = {
  name: '',
  lastName: '',
  phone: '',
  email: '',
  confirmEmail: '',
};

const Checkout = () => {
  const { cart, clearCart, getTotalPrice } = useContext(CartContext);
  const [buyer, setBuyer] = useState(initialBuyer);
  const [formError, setFormError] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBuyer((currentBuyer) => ({ ...currentBuyer, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    setSubmissionError('');

    const hasEmptyField = Object.values(buyer).some((value) => !value.trim());

    if (hasEmptyField) {
      setFormError('Completa todos los campos para continuar con tu compra.');
      return;
    }

    if (buyer.email.trim().toLowerCase() !== buyer.confirmEmail.trim().toLowerCase()) {
      setFormError('El email y su confirmación deben coincidir.');
      return;
    }

    if (cart.length === 0) {
      setFormError('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }

    const order = {
      buyer: {
        name: buyer.name.trim(),
        lastName: buyer.lastName.trim(),
        phone: buyer.phone.trim(),
        email: buyer.email.trim().toLowerCase(),
      },
      items: cart.map((item) => ({
        id: item.id,
        title: item.title || item.name || 'Producto sin nombre',
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 0,
      })),
      total: getTotalPrice(),
      date: serverTimestamp(),
    };

    try {
      setIsSubmitting(true);
      const orderReference = await addDoc(collection(db, 'orders'), order);
      setOrderId(orderReference.id);
      clearCart();
    } catch (error) {
      console.error('No se pudo crear la orden en Firestore.', error);
      setSubmissionError('No pudimos registrar tu orden. Revisa tu conexión e inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <main style={{ display: 'grid', width: 'min(720px, calc(100% - 2rem))', minHeight: '65vh', margin: '0 auto', placeItems: 'center', padding: '3rem 0' }}>
        <section style={{ width: '100%', padding: '2.4rem', border: '1px solid rgba(74, 222, 128, 0.32)', borderRadius: '22px', background: 'linear-gradient(145deg, rgba(20, 83, 45, 0.32), rgba(15, 23, 42, 0.88))', textAlign: 'center', boxShadow: '0 24px 48px rgba(0, 0, 0, 0.24)' }}>
          <p style={{ margin: 0, fontSize: '2.6rem' }}>✓</p>
          <h1 style={{ margin: '0.55rem 0 0', color: '#f0fdf4', fontSize: '1.85rem' }}>¡Gracias por tu compra!</h1>
          <p style={{ margin: '0.75rem 0 0', color: '#dcfce7' }}>Tu orden fue creada correctamente en Firebase.</p>
          <div style={{ margin: '1.35rem 0', padding: '1rem', border: '1px solid rgba(134, 239, 172, 0.28)', borderRadius: '12px', background: 'rgba(3, 7, 18, 0.42)' }}>
            <span style={{ display: 'block', color: '#bbf7d0', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>ID de tu orden</span>
            <strong style={{ display: 'block', marginTop: '0.35rem', color: '#f8fafc', fontSize: '1.05rem', overflowWrap: 'anywhere' }}>{orderId}</strong>
          </div>
          <Link to="/" style={{ display: 'inline-flex', padding: '0.75rem 1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #2563eb)', color: '#ffffff', fontWeight: 800, textDecoration: 'none' }}>
            Volver a la tienda
          </Link>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main style={{ display: 'grid', width: 'min(720px, calc(100% - 2rem))', minHeight: '60vh', margin: '0 auto', placeItems: 'center', padding: '3rem 0' }}>
        <section style={{ width: '100%', padding: '2rem', border: '1px solid rgba(103, 232, 249, 0.22)', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.7)', textAlign: 'center' }}>
          <h1 style={{ margin: 0, color: '#f8fafc', fontSize: '1.6rem' }}>No hay productos para pagar</h1>
          <p style={{ margin: '0.75rem 0 1.3rem', color: '#cbd5e1' }}>Agrega productos al carrito antes de ir al checkout.</p>
          <Link to="/" style={{ display: 'inline-flex', padding: '0.75rem 1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #2563eb)', color: '#ffffff', fontWeight: 800, textDecoration: 'none' }}>Volver al catálogo</Link>
        </section>
      </main>
    );
  }

  const inputStyle = {
    width: '100%',
    marginTop: '0.4rem',
    padding: '0.78rem 0.85rem',
    border: '1px solid rgba(148, 163, 184, 0.26)',
    borderRadius: '10px',
    outline: 'none',
    background: 'rgba(15, 23, 42, 0.72)',
    color: '#f8fafc',
  };

  return (
    <main style={{ width: 'min(1000px, calc(100% - 2rem))', margin: '0 auto', padding: '3rem 0 4rem' }}>
      <header style={{ marginBottom: '1.6rem' }}>
        <p style={{ margin: 0, color: '#67e8f9', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Último paso</p>
        <h1 style={{ margin: '0.4rem 0 0', color: '#f8fafc', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Finalizar compra</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(250px, 320px)', gap: '1.5rem', alignItems: 'start' }}>
        <form onSubmit={handleSubmit} noValidate style={{ padding: '1.35rem', border: '1px solid rgba(148, 163, 184, 0.16)', borderRadius: '18px', background: 'rgba(15, 23, 42, 0.72)' }}>
          <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem' }}>Datos de contacto</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginTop: '1.2rem' }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}>Nombre<input type="text" name="name" value={buyer.name} onChange={handleChange} autoComplete="given-name" style={inputStyle} /></label>
            <label style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}>Apellido<input type="text" name="lastName" value={buyer.lastName} onChange={handleChange} autoComplete="family-name" style={inputStyle} /></label>
          </div>
          <label style={{ display: 'block', marginTop: '1rem', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}>Teléfono<input type="tel" name="phone" value={buyer.phone} onChange={handleChange} autoComplete="tel" style={inputStyle} /></label>
          <label style={{ display: 'block', marginTop: '1rem', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}>Email<input type="email" name="email" value={buyer.email} onChange={handleChange} autoComplete="email" style={inputStyle} /></label>
          <label style={{ display: 'block', marginTop: '1rem', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}>Confirmar Email<input type="email" name="confirmEmail" value={buyer.confirmEmail} onChange={handleChange} autoComplete="email" style={inputStyle} /></label>
          {(formError || submissionError) && <p role="alert" style={{ margin: '1rem 0 0', color: '#fda4af', fontSize: '0.9rem' }}>{formError || submissionError}</p>}
          <button type="submit" disabled={isSubmitting} style={{ width: '100%', minHeight: '48px', marginTop: '1.35rem', border: 0, borderRadius: '10px', background: isSubmitting ? 'rgba(71, 85, 105, 0.7)' : 'linear-gradient(135deg, #06b6d4, #2563eb)', color: '#ffffff', cursor: isSubmitting ? 'wait' : 'pointer', fontWeight: 800 }}>
            {isSubmitting ? 'Creando orden...' : 'Confirmar compra'}
          </button>
        </form>
        <aside style={{ padding: '1.35rem', border: '1px solid rgba(103, 232, 249, 0.2)', borderRadius: '18px', background: 'linear-gradient(145deg, rgba(8, 47, 73, 0.48), rgba(15, 23, 42, 0.88))' }}>
          <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.15rem' }}>Resumen</h2>
          <div style={{ display: 'grid', gap: '0.7rem', marginTop: '1rem' }}>
            {cart.map((item) => <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.88rem' }}><span>{item.title || item.name} × {item.quantity}</span><span>{priceFormatter.format((Number(item.price) || 0) * (Number(item.quantity) || 0))}</span></div>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(148, 163, 184, 0.18)' }}>
            <strong style={{ color: '#f8fafc' }}>Total</strong>
            <strong style={{ color: '#a5f3fc', fontSize: '1.15rem' }}>{priceFormatter.format(getTotalPrice())}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
