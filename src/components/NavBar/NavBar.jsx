import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

const navigationLinks = [
  { to: '/', label: 'Todo' },
  { to: '/category/equipos', label: 'Equipos' },
  { to: '/category/desechables', label: 'Desechables' },
  { to: '/category/eliquids', label: 'E-liquids' },
];

const NavBar = () => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        borderBottom: '1px solid rgba(148, 163, 184, 0.14)',
        background: 'rgba(3, 7, 18, 0.9)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.24)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'min(1200px, calc(100% - 2rem))',
          minHeight: '76px',
          margin: '0 auto',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          padding: '0.75rem 0',
        }}
      >
        <Link
          to="/"
          aria-label="Mega Cloud Vape Shop, ir al inicio"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.7rem',
            color: '#f8fafc',
            fontSize: '0.96rem',
            fontWeight: 800,
            letterSpacing: '0.01em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'grid',
              width: '38px',
              height: '38px',
              placeItems: 'center',
              border: '1px solid rgba(103, 232, 249, 0.52)',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0891b2, #2563eb)',
              boxShadow: '0 8px 20px rgba(14, 165, 233, 0.28)',
              color: '#ffffff',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
            }}
          >
            MC
          </span>
          <span>
            Mega Cloud Vape Shop <span style={{ color: '#67e8f9', fontSize: '0.76rem' }}>(Est. 2018)</span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', flexWrap: 'wrap' }}
        >
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                padding: '0.55rem 0.7rem',
                borderRadius: '9px',
                background: isActive ? 'rgba(34, 211, 238, 0.13)' : 'transparent',
                color: isActive ? '#a5f3fc' : '#cbd5e1',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                transition: 'color 160ms ease, background 160ms ease',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <CartWidget />
      </div>
    </header>
  );
};

export default NavBar;
