import Item from './Item';

const ItemList = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <section
        aria-live="polite"
        style={{
          padding: '3rem 1.5rem',
          border: '1px dashed rgba(103, 232, 249, 0.3)',
          borderRadius: '18px',
          background: 'rgba(15, 23, 42, 0.5)',
          color: '#cbd5e1',
          textAlign: 'center',
        }}
      >
        <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.25rem' }}>Aún no hay productos en esta categoría</h2>
        <p style={{ margin: '0.6rem 0 0' }}>Pronto tendremos nuevas opciones disponibles para ti.</p>
      </section>
    );
  }

  return (
    <section
      aria-label="Lista de productos"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))',
        gap: '1.25rem',
      }}
    >
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ItemList;
