import { useState } from 'react';

const ItemCount = ({ stock, onAdd, initial = 1 }) => {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((current) => Math.min(current + 1, stock));
  const decrement = () => setCount((current) => Math.max(current - 1, 1));

  return (
    <div className="item-count">
      <div className="item-count__controls">
        <button type="button" onClick={decrement} aria-label="Disminuir cantidad">-</button>
        <span>{count}</span>
        <button type="button" onClick={increment} aria-label="Aumentar cantidad">+</button>
      </div>
      <button type="button" className="btn btn--primary" onClick={() => onAdd(count)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
