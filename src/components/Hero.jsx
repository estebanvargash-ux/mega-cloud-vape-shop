import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => (
  <section className="hero" aria-label="Hero principal">
    <motion.div
      className="hero__content"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="hero__eyebrow">Tienda premium de vapeo</p>
      <h1>Mega Cloud Vape Shop</h1>
      <p className="hero__subtitle">
        Los mejores dispositivos, pods, líquidos y accesorios del mercado en una experiencia moderna y segura.
      </p>
      <div className="hero__actions">
        <Link to="/category/Kits" className="btn btn--primary">Comprar Ahora</Link>
        <Link to="/category/Pods" className="btn btn--secondary">Ver Catálogo</Link>
      </div>
    </motion.div>
    <motion.div
      className="hero__visual"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero__card">
        <p className="hero__badge">Nuevo</p>
        <h2>Starter Kits</h2>
        <p>Potencia, diseño y rendimiento desde el primer uso.</p>
      </div>
    </motion.div>
  </section>
);

export default Hero;
