import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar" aria-label="Buscador de productos">
    <FiSearch aria-hidden="true" />
    <input type="search" placeholder="Buscar por nombre, marca o categoría" value={value} onChange={onChange} aria-label="Buscar productos" />
  </div>
);

export default SearchBar;
