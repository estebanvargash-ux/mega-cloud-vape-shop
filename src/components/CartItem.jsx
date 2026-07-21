import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item, onRemove, onQuantityChange }) => (
  <li className="cart-item">
    <img src={item.image} alt={item.name} />
    <div className="cart-item__details">
      <h4>{item.name}</h4>
      <p>{item.brand}</p>
      <div className="item-count item-count--compact">
        <button type="button" onClick={() => onQuantityChange(item.id, item.quantity - 1)} aria-label={`Disminuir cantidad de ${item.name}`}>
          <FiMinus />
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => onQuantityChange(item.id, item.quantity + 1)} aria-label={`Aumentar cantidad de ${item.name}`}>
          <FiPlus />
        </button>
      </div>
    </div>
    <div className="cart-item__price">
      <strong>${(item.price * item.quantity).toLocaleString('es-CL')}</strong>
      <button type="button" onClick={() => onRemove(item.id)} aria-label={`Eliminar ${item.name} del carrito`}>
        <FiTrash2 />
      </button>
    </div>
  </li>
);

export default CartItem;
