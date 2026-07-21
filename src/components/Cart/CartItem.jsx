import { useContext } from 'react';
import CartContext from '../../context/CartContext';

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const CartItem = ({ item }) => {
  const { removeItem } = useContext(CartContext);
  const title = item.title || item.name || 'Producto sin nombre';
  const unitPrice = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 0;
  const subtotal = unitPrice * quantity;

  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: '84px minmax(0, 1fr) auto',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        border: '1px solid rgba(148, 163, 184, 0.16)',
        borderRadius: '16px',
        background: 'rgba(15, 23, 42, 0.7)',
      }}
    >
      <img src={item.image} alt={title} style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover', background: '#0f172a' }} />
      <div>
        <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.02rem', lineHeight: 1.35 }}>{title}</h2>
        <p style={{ margin: '0.35rem 0 0', color: '#94a3b8', fontSize: '0.86rem' }}>Precio unitario: {priceFormatter.format(unitPrice)}</p>
        <p style={{ margin: '0.25rem 0 0', color: '#cbd5e1', fontSize: '0.86rem' }}>Cantidad: {quantity}</p>
      </div>
      <div style={{ display: 'grid', justifyItems: 'end', gap: '0.7rem', textAlign: 'right' }}>
        <strong style={{ color: '#a5f3fc', fontSize: '1rem' }}>{priceFormatter.format(subtotal)}</strong>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          aria-label={`Eliminar ${title} del carrito`}
          style={{ padding: '0.42rem 0.62rem', border: '1px solid rgba(251, 113, 133, 0.38)', borderRadius: '8px', background: 'rgba(136, 19, 55, 0.2)', color: '#fda4af', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 750 }}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default CartItem;
