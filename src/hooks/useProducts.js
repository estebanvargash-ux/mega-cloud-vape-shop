import { useEffect, useState } from 'react';
import { getProducts, getFeaturedProducts } from '../services/FirestoreService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [allProducts, featured] = await Promise.all([getProducts(), getFeaturedProducts()]);
        setProducts(allProducts);
        setFeaturedProducts(featured);
      } catch (err) {
        setError('No pudimos cargar los productos en este momento.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, featuredProducts, loading, error };
};
