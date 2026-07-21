import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/category/Pods', label: 'Pods' },
  { to: '/category/Kits', label: 'Kits' },
  { to: '/about', label: 'Nosotros' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contacto' },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand" aria-label="Mega Cloud Vape Shop inicio">
        <span className="navbar__brand-mark">MC</span>
        <span>Mega Cloud Vape Shop</span>
      </Link>
      <nav className="navbar__nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="navbar__actions">
        <form className="navbar__search" aria-label="Buscador" onSubmit={handleSearchSubmit}>
          <FiSearch aria-hidden="true" />
          <input type="search" placeholder="Buscar" aria-label="Buscar productos" value={search} onChange={(event) => setSearch(event.target.value)} />
        </form>
        <Link to="/cart" className="navbar__cart" aria-label="Carrito de compras">
          <FiShoppingBag aria-hidden="true" />
          <span>{totalItems}</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
