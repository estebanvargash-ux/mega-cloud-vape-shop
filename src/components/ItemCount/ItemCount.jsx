import { useEffect, useMemo, useState } from 'react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const availableStock = useMemo(() => Math.max(0, Math.floor(Number(stock) || 0)), [stock]);
  const safeInitialCount = useMemo(() => {
    const requestedInitial = Math.max(1, Math.floor(Number(initial) || 1));

    return availableStock > 0 ? Math.min(requestedInitial, availableStock) : 1;
  }, [availableStock, initial]);
  const [count, setCount] = useState(safeInitialCount);

  useEffect(() => {
    setCount(safeInitialCount);
  }, [safeInitialCount]);

  const decreaseCount = () => {
    setCount((currentCount) => Math.max(1, currentCount - 1));
  };

  const increaseCount = () => {
    setCount((currentCount) => Math.min(availableStock, currentCount + 1));
  };

  const handleAdd = () => {
    if (availableStock > 0) {
      onAdd(count);
    }
  };

  const controlButtonStyle = {
    display: 'grid',
    width: '38px',
    height: '38px',
    placeItems: 'center',
    border: '1px solid rgba(148, 163, 184, 0.28)',
    borderRadius: '10px',
    background: 'rgba(15, 23, 42, 0.9)',
    color: '#e2e8f0',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 700,
  };

  return (
    <section aria-label="Selector de cantidad" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.9rem', marginTop: '1.5rem' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.4rem',
          border: '1px solid rgba(148, 163, 184, 0.18)',
          borderRadius: '14px',
          background: 'rgba(15, 23, 42, 0.58)',
        }}
      >
        <button
          type="button"
          onClick={decreaseCount}
          disabled={availableStock === 0 || count <= 1}
          aria-label="Disminuir cantidad"
          style={{ ...controlButtonStyle, opacity: availableStock === 0 || count <= 1 ? 0.42 : 1, cursor: availableStock === 0 || count <= 1 ? 'not-allowed' : 'pointer' }}
        >
          −
        </button>
        <output aria-live="polite" style={{ minWidth: '28px', color: '#f8fafc', fontSize: '1.05rem', fontWeight: 800, textAlign: 'center' }}>
          {count}
        </output>
        <button
          type="button"
          onClick={increaseCount}
          disabled={availableStock === 0 || count >= availableStock}
          aria-label="Aumentar cantidad"
          style={{ ...controlButtonStyle, opacity: availableStock === 0 || count >= availableStock ? 0.42 : 1, cursor: availableStock === 0 || count >= availableStock ? 'not-allowed' : 'pointer' }}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={availableStock === 0}
        style={{
          minHeight: '48px',
          padding: '0.75rem 1.15rem',
          border: 0,
          borderRadius: '11px',
          background: availableStock > 0 ? 'linear-gradient(135deg, #06b6d4, #2563eb)' : 'rgba(71, 85, 105, 0.62)',
          color: '#ffffff',
          cursor: availableStock > 0 ? 'pointer' : 'not-allowed',
          fontSize: '0.92rem',
          fontWeight: 800,
          boxShadow: availableStock > 0 ? '0 12px 26px rgba(8, 145, 178, 0.28)' : 'none',
        }}
      >
        {availableStock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
      </button>
    </section>
  );
};

export default ItemCount;
