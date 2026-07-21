import { FiStar } from 'react-icons/fi';

const Rating = ({ value }) => (
  <div className="product-detail__rating" aria-label={`Calificación ${value} de 5`}>
    <FiStar /> {value}
  </div>
);

export default Rating;
