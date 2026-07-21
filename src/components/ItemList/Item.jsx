import { Link } from 'react-router-dom';

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const Item = ({ product }) => {
  const title = product.title || product.name || 'Producto sin nombre';
  const stock = Number(product.stock) || 0;

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(148, 163, 184, 0.16)',
        borderRadius: '18px',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.94), rgba(8, 15, 29, 0.94))',
        boxShadow: '0 18px 40px rgba(0, 0, 0, 0.22)',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: '#0f172a' }}>
        <img
          src={product.image}
          alt={title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '0.35rem 0.55rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '999px',
            background: stock > 0 ? 'rgba(6, 78, 59, 0.88)' : 'rgba(127, 29, 29, 0.88)',
            color: stock > 0 ? '#a7f3d0' : '#fecaca',
            fontSize: '0.72rem',
            fontWeight: 700,
          }}
        >
          {stock > 0 ? 'Disponible' : 'Sin stock'}
        </span>
      </div>

      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1.15rem' }}>
        <p style={{ margin: 0, color: '#67e8f9', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {product.category || 'Vape Shop'}
        </p>
        <h2 style={{ margin: '0.48rem 0 0', color: '#f8fafc', fontSize: '1.08rem', lineHeight: 1.35 }}>
          {title}
        </h2>
        <p style={{ margin: '0.8rem 0 0', color: '#f8fafc', fontSize: '1.35rem', fontWeight: 800 }}>
          {priceFormatter.format(Number(product.price) || 0)}
        </p>
        <p style={{ margin: '0.35rem 0 1.1rem', color: stock > 0 ? '#94a3b8' : '#fca5a5', fontSize: '0.88rem' }}>
          {stock > 0 ? `${stock} unidades disponibles` : 'Este producto no tiene stock disponible'}
        </p>
        <Link
          to={`/item/${product.id}`}
          style={{
            display: 'inline-flex',
            marginTop: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.72rem 1rem',
            border: '1px solid rgba(103, 232, 249, 0.5)',
            borderRadius: '10px',
            background: 'rgba(8, 145, 178, 0.14)',
            color: '#a5f3fc',
            fontSize: '0.9rem',
            fontWeight: 750,
            textDecoration: 'none',
          }}
        >
          Ver Detalle
        </Link>
      </div>
    </article>
  );
};

export default Item;
