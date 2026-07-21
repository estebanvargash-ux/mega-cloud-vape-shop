import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import ItemCount from '../components/ItemCount';
import { getProductById } from '../services/FirestoreService';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setAdded(false);
      const currentProduct = await getProductById(id);
      setProduct(currentProduct);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleAdd = (quantity) => {
    if (!product || product.stock <= 0) {
      return;
    }

    const addedSuccessfully = addItem(product, quantity);
    if (addedSuccessfully) {
      setAdded(true);
    }
  };

  if (loading) {
    return <div className="page page--center"><div className="loader" aria-label="Cargando producto" /></div>;
  }

  if (!product) {
    return <div className="page page--center">Producto no encontrado.</div>;
  }

  return (
    <main className="page">
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-detail__image" />
        <div className="product-detail__content">
          <p className="section__eyebrow">{product.brand}</p>
          <h1>{product.name}</h1>
          <div className="product-detail__rating">
            <FiStar /> {product.rating} · {product.sales} ventas
          </div>
          <p className="product-detail__price">${product.price.toLocaleString('es-CL')}</p>
          <p className="product-detail__stock">{product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}</p>
          <p>{product.description}</p>
          <ul className="product-detail__features">
            <li>Rendimiento premium</li>
            <li>Diseño ergonómico</li>
            <li>Entrega rápida en Chile</li>
          </ul>
          {product.stock > 0 ? (
            added ? (
              <div className="product-detail__actions">
                <Link to="/cart" className="btn btn--primary">Ir al carrito</Link>
                <Link to="/" className="btn btn--secondary">Seguir comprando</Link>
              </div>
            ) : (
              <ItemCount stock={product.stock} onAdd={handleAdd} />
            )
          ) : (
            <p className="empty-state">Sin stock</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Product;
