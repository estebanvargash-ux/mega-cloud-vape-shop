import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import PromoBanner from '../components/PromoBanner';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { useProducts } from '../hooks/useProducts';

const Home = () => {
  const { products, loading, error } = useProducts();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ brand: '', category: '', price: '', stock: '', sort: 'featured' });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setQuery(q);
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    let data = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter((product) =>
        [product.name, product.brand, product.category].some((value) => value.toLowerCase().includes(q)),
      );
    }
    if (filters.brand) {
      data = data.filter((product) => product.brand === filters.brand);
    }
    if (filters.category) {
      data = data.filter((product) => product.category === filters.category);
    }
    if (filters.price === 'under-20000') {
      data = data.filter((product) => product.price < 20000);
    }
    if (filters.price === '20000-40000') {
      data = data.filter((product) => product.price >= 20000 && product.price <= 40000);
    }
    if (filters.price === 'over-40000') {
      data = data.filter((product) => product.price > 40000);
    }
    if (filters.stock === 'available') {
      data = data.filter((product) => product.stock > 0);
    }
    if (filters.stock === 'out') {
      data = data.filter((product) => product.stock === 0);
    }
    switch (filters.sort) {
      case 'price-desc':
        data.sort((a, b) => b.price - a.price);
        break;
      case 'price-asc':
        data.sort((a, b) => a.price - b.price);
        break;
      case 'sales':
        data.sort((a, b) => b.sales - a.sales);
        break;
      case 'recent':
        data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      default:
        data.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return data;
  }, [filters, products, query]);

  if (loading) {
    return (
      <div className="page page--center">
        <div className="loader" aria-label="Cargando productos" />
      </div>
    );
  }

  if (error) {
    return <div className="page page--center">{error}</div>;
  }

  return (
    <main>
      <Hero />
      <PromoBanner />
      <CategoryGrid products={products} />
      <section className="section">
        <div className="section__heading">
          <p className="section__eyebrow">Nuestros productos</p>
          <h2>Catálogo completo</h2>
        </div>
        <SearchBar value={query} onChange={(event) => setQuery(event.target.value)} />
        <Filters
          filters={filters}
          onChange={(event) => setFilters((current) => ({ ...current, [event.target.name]: event.target.value }))}
          onSortChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value }))}
        />
        {filteredProducts.length === 0 ? (
          <motion.div className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>No existen productos con esos filtros.</h3>
            <p>Prueba con otra búsqueda o cambia los filtros.</p>
          </motion.div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </section>
    </main>
  );
};

export default Home;
