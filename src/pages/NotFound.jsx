import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="page page--center">
    <div className="empty-state">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="btn btn--primary">Volver al inicio</Link>
    </div>
  </main>
);

export default NotFound;
