import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const CartWidget = () => {
  const { getTotalQuantity } = useContext(CartContext);
  const totalQuantity = getTotalQuantity();

  return (
    <Link
      to="/cart"
      aria-label={`Ir al carrito${totalQuantity > 0 ? `, ${totalQuantity} productos` : ''}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '46px',
        height: '46px',
        border: '1px solid rgba(103, 232, 249, 0.3)',
        borderRadius: '14px',
        background: 'rgba(8, 47, 73, 0.55)',
        color: '#a5f3fc',
        boxShadow: '0 10px 28px rgba(8, 145, 178, 0.16)',
      }}
    >
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
        <path d="M3 3h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1.3" />
        <circle cx="18" cy="20" r="1.3" />
      </svg>
      {totalQuantity > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            display: 'grid',
            minWidth: '22px',
            height: '22px',
            padding: '0 5px',
            placeItems: 'center',
            border: '2px solid #071018',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            color: '#ffffff',
            fontSize: '0.72rem',
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;
