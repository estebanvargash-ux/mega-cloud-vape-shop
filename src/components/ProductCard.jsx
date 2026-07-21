import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addItem, getQuantity } = useCart();
  const quantityInCart = getQuantity(product.id);

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description?.slice(0, 80) || 'Sin descripción disponible.'}...</p>
        <div className="product-card__footer">
          <div>
            <strong>${product.price.toLocaleString('es-CL')}</strong>
            <p>{product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}</p>
          </div>
          <div className="product-card__actions">
            <Link to={`/item/${product.id}`} className="btn btn--ghost">Ver detalle</Link>
            <button
              type="button"
              className="btn btn--icon"
              onClick={() => addItem(product, 1)}
              aria-label={`Agregar ${product.name} al carrito`}
              disabled={product.stock === 0}
            >
              <FiShoppingCart />
              {quantityInCart > 0 ? `+${quantityInCart}` : ''}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
