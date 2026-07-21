import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';
  const total = location.state?.total;
  const itemCount = location.state?.items || 0;

  return (
    <main className="page page--center">
      <div className="order-success">
        <h1>Compra realizada con éxito</h1>
        <p>Tu pedido fue procesado correctamente.</p>
        <p className="order-success__id">Número de orden: {orderId}</p>
        {total !== undefined && <p>Importe pagado: ${Number(total).toLocaleString('es-CL')}</p>}
        {itemCount > 0 && <p>Productos confirmados: {itemCount}</p>}
        <div className="product-detail__actions">
          <Link to="/" className="btn btn--primary">Seguir comprando</Link>
          <Link to="/cart" className="btn btn--secondary">Ver carrito</Link>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
