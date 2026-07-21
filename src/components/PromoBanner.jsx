import { Link } from 'react-router-dom';

const PromoBanner = () => (
  <section className="promo-banner" aria-label="Promoción destacada">
    <div>
      <p className="promo-banner__tag">15% OFF</p>
      <h3>Starter Kits</h3>
      <p>Envío a todo Chile y asesoría experta.</p>
    </div>
    <Link to="/category/Kits" className="btn btn--primary">Comprar</Link>
  </section>
);

export default PromoBanner;
