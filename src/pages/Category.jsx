import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { getProductsByCategory } from '../services/FirestoreService';

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const categoryProducts = await getProductsByCategory(decodeURIComponent(id));
      setProducts(categoryProducts);
      setLoading(false);
    };

    loadProducts();
  }, [id]);

  const title = useMemo(() => decodeURIComponent(id), [id]);

  if (loading) {
    return <div className="page page--center"><div className="loader" aria-label="Cargando categoría" /></div>;
  }

  return (
    <main className="page">
      <div className="page__header">
        <p className="section__eyebrow">Categoría</p>
        <h1>{title}</h1>
        <p>{products.length} artículos disponibles</p>
        <Link to="/" className="btn btn--secondary">Volver al inicio</Link>
      </div>
      {products.length === 0 ? <div className="empty-state"><h3>No hay productos en esta categoría.</h3></div> : <ProductGrid products={products} />}
    </main>
  );
};

export default Category;
