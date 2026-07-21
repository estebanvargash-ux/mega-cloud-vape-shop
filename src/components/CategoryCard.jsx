import { Link } from 'react-router-dom';

const CategoryCard = ({ category, count, image }) => (
  <Link to={`/category/${encodeURIComponent(category)}`} className="category-card" aria-label={`Ver categoría ${category}`}>
    <img src={image} alt={category} />
    <div className="category-card__content">
      <h3>{category}</h3>
      <p>{count} productos</p>
    </div>
  </Link>
);

export default CategoryCard;
