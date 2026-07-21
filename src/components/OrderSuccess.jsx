import { Link } from 'react-router-dom';

const OrderSuccess = ({ orderId }) => (
  <section className="order-success" aria-label="Compra realizada con éxito">
    <h2>¡Compra realizada con éxito!</h2>
    <p>Tu pedido fue registrado correctamente.</p>
    <p className="order-success__id">Número de orden: {orderId}</p>
    <Link to="/" className="btn btn--primary">Volver al inicio</Link>
  </section>
);

export default OrderSuccess;
