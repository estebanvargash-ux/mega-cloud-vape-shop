import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import Spinner from '../Loaders/Spinner';
import ItemList from './ItemList';

const categoryLabels = {
  equipos: 'Equipos',
  desechables: 'Desechables',
  eliquids: 'E-liquids',
};

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrentRequest = true;

    const getProductsFromFirestore = async () => {
      setLoading(true);
      setError('');

      try {
        const productsReference = collection(db, 'products');
        const productsQuery = categoryId
          ? query(productsReference, where('category', '==', categoryId))
          : productsReference;
        const productsSnapshot = await getDocs(productsQuery);

        if (isCurrentRequest) {
          setProducts(
            productsSnapshot.docs.map((productDocument) => ({
              ...productDocument.data(),
              id: productDocument.id,
            })),
          );
        }
      } catch (fetchError) {
        console.error('No se pudieron cargar los productos desde Firestore.', fetchError);

        if (isCurrentRequest) {
          setProducts([]);
          setError('No pudimos cargar el catálogo en este momento. Intenta nuevamente más tarde.');
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    getProductsFromFirestore();

    return () => {
      isCurrentRequest = false;
    };
  }, [categoryId]);

  const categoryTitle = categoryId ? categoryLabels[categoryId] || categoryId : 'Todo el catálogo';

  if (loading) {
    return <Spinner />;
  }

  return (
    <main style={{ width: 'min(1200px, calc(100% - 2rem))', margin: '0 auto', padding: '3rem 0 4rem' }}>
      <header style={{ marginBottom: '1.75rem' }}>
        <p style={{ margin: 0, color: '#67e8f9', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          Mega Cloud Vape Shop
        </p>
        <h1 style={{ margin: '0.4rem 0 0', color: '#f8fafc', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
          {categoryTitle}
        </h1>
        <p style={{ margin: '0.75rem 0 0', color: '#94a3b8' }}>
          {products.length === 1 ? '1 producto encontrado' : `${products.length} productos encontrados`}
        </p>
      </header>

      {error ? (
        <section
          role="alert"
          style={{
            padding: '1.1rem 1.25rem',
            border: '1px solid rgba(251, 113, 133, 0.35)',
            borderRadius: '14px',
            background: 'rgba(136, 19, 55, 0.18)',
            color: '#fecdd3',
          }}
        >
          {error}
        </section>
      ) : (
        <ItemList products={products} />
      )}
    </main>
  );
};

export default ItemListContainer;
