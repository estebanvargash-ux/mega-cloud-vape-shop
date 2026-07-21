const Spinner = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Cargando productos"
      style={{
        display: 'grid',
        minHeight: '220px',
        placeItems: 'center',
        color: '#67e8f9',
      }}
    >
      <div style={{ display: 'grid', justifyItems: 'center', gap: '1rem' }}>
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="29" cy="29" r="23" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="5" />
          <path
            d="M29 6a23 23 0 0 1 23 23"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 29 29"
              to="360 29 29"
              dur="0.85s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <span style={{ color: '#cbd5e1', fontSize: '0.9rem', letterSpacing: '0.04em' }}>
          Cargando catálogo...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
