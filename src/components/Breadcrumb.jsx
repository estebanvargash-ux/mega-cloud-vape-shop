import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => (
  <nav className="page__header" aria-label="Breadcrumb">
    {items.map((item, index) => (
      <span key={item.label}>
        {index > 0 && ' / '}
        {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
