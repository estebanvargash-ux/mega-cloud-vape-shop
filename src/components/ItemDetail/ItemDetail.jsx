import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const ItemDetail = ({ product }) => {
  const { addItem } = useContext(CartContext);
  const [quantityAdded, setQuantityAdded] = useState(0);
  const title = product.title || product.name || 'Producto sin nombre';
  const availableStock = Math.max(0, Number(product.stock) || 0);

  useEffect(() => {
    setQuantityAdded(0);
  }, [product.id]);

  const handleOnAdd = (quantity) => {
    const wasAdded = addItem(product, quantity);

    if (wasAdded) {
      setQuantityAdded(quantity);
    }
  };

  return (
    <main style={{ width: 'min(1140px, calc(100% - 2rem))', margin: '0 auto', padding: '3rem 0 4rem' }}>
      <article
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 'clamp(1.5rem, 4vw, 3.25rem)',
          alignItems: 'start',
          padding: 'clamp(1rem, 3vw, 2rem)',
          border: '1px solid rgba(148, 163, 184, 0.16)',
          borderRadius: '24px',
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.88), rgba(5, 12, 25, 0.95))',
          boxShadow: '0 28px 60px rgba(0, 0, 0, 0.28)',
        }}
      >
        <div style={{ overflow: 'hidden', borderRadius: '18px', background: '#0f172a', aspectRatio: '1 / 1' }}>
          <img src={product.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div>
          <p style={{ margin: 0, color: '#67e8f9', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {product.category || 'Vape Shop'}
          </p>
          <h1 style={{ margin: '0.55rem 0 0', color: '#f8fafc', fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.08 }}>
            {title}
          </h1>
          <p style={{ margin: '1.2rem 0 0', color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7 }}>
            {product.description || 'No hay una descripción disponible para este producto.'}
          </p>
          <p style={{ margin: '1.5rem 0 0', color: '#f8fafc', fontSize: '2rem', fontWeight: 850 }}>
            {priceFormatter.format(Number(product.price) || 0)}
          </p>
          <p style={{ margin: '0.45rem 0 0', color: availableStock > 0 ? '#86efac' : '#fda4af', fontSize: '0.92rem', fontWeight: 700 }}>
            {availableStock > 0 ? `${availableStock} unidades disponibles` : 'Producto sin stock'}
          </p>

          {quantityAdded === 0 ? (
            <ItemCount stock={availableStock} initial={1} onAdd={handleOnAdd} />
          ) : (
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                border: '1px solid rgba(74, 222, 128, 0.28)',
                borderRadius: '14px',
                background: 'rgba(20, 83, 45, 0.24)',
              }}
            >
              <p style={{ margin: 0, color: '#bbf7d0', fontWeight: 700 }}>
                {quantityAdded} {quantityAdded === 1 ? 'unidad agregada' : 'unidades agregadas'} al carrito.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                <Link
                  to="/cart"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #2563eb)', color: '#ffffff', fontWeight: 800, textDecoration: 'none' }}
                >
                  Terminar Compra
                </Link>
                <Link
                  to="/"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1rem', border: '1px solid rgba(148, 163, 184, 0.35)', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.72)', color: '#e2e8f0', fontWeight: 750, textDecoration: 'none' }}
                >
                  Seguir Comprando
                </Link>
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
};

export default ItemDetail;
