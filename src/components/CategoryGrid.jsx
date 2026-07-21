import { categories } from '../services/productsData';
import CategoryCard from './CategoryCard';

const categoryImages = {
  Pods: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
  Kits: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  Desechables: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  'Sales de Nicotina': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  Líquidos: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80',
  Resistencias: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
  Accesorios: 'https://images.unsplash.com/photo-1495107334309-d1c5054f83d0?auto=format&fit=crop&w=900&q=80',
};

const CategoryGrid = ({ products }) => {
  const counts = categories.map((category) => ({
    category,
    count: products.filter((product) => product.category === category).length,
  }));

  return (
    <section className="section">
      <div className="section__heading">
        <p className="section__eyebrow">Explora por categoría</p>
        <h2>Categorías destacadas</h2>
      </div>
      <div className="category-grid">
        {counts.map((item) => (
          <CategoryCard key={item.category} category={item.category} count={item.count} image={categoryImages[item.category]} />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
