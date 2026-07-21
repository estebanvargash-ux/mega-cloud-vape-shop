import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import Spinner from '../Loaders/Spinner';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrentRequest = true;

    const getProductFromFirestore = async () => {
      setLoading(true);
      setError('');
      setProduct(null);

      try {
        const productReference = doc(db, 'products', itemId);
        const productSnapshot = await getDoc(productReference);

        if (isCurrentRequest && productSnapshot.exists()) {
          setProduct({ ...productSnapshot.data(), id: productSnapshot.id });
        }
      } catch (fetchError) {
        console.error('No se pudo cargar el detalle del producto.', fetchError);

        if (isCurrentRequest) {
          setError('No pudimos cargar este producto. Por favor, intenta nuevamente.');
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    getProductFromFirestore();

    return () => {
      isCurrentRequest = false;
    };
  }, [itemId]);

  if (loading) {
    return <Spinner />;
  }

  if (!product || error) {
    return (
      <main style={{ display: 'grid', width: 'min(720px, calc(100% - 2rem))', minHeight: '55vh', margin: '0 auto', placeItems: 'center', padding: '3rem 0' }}>
        <section style={{ width: '100%', padding: '2.25rem', border: '1px solid rgba(251, 113, 133, 0.28)', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.68)', color: '#e2e8f0', textAlign: 'center' }}>
          <h1 style={{ margin: 0, color: '#f8fafc', fontSize: '1.65rem' }}>Producto no encontrado</h1>
          <p style={{ margin: '0.8rem 0 1.35rem', color: '#cbd5e1' }}>
            {error || 'El producto que buscas no existe o ya no está disponible en el catálogo.'}
          </p>
          <Link to="/" style={{ display: 'inline-flex', padding: '0.75rem 1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #2563eb)', color: '#ffffff', fontWeight: 800, textDecoration: 'none' }}>
            Volver al catálogo
          </Link>
        </section>
      </main>
    );
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
