const Skeleton = ({ lines = 4 }) => (
  <div className="empty-state" aria-label="Cargando vista">
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} style={{ height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', marginBottom: '0.7rem' }} />
    ))}
  </div>
);

export default Skeleton;
