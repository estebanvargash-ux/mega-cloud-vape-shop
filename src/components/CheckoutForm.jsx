import { useState } from 'react';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  phone: '',
  address: '',
  city: '',
  region: '',
  notes: '',
};

const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.confirmEmail || !form.phone || !form.address || !form.city || !form.region) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Ingresa un correo válido.');
      return;
    }
    if (form.email !== form.confirmEmail) {
      setError('Los correos no coinciden.');
      return;
    }
    if (form.phone.trim().length < 8) {
      setError('Ingresa un teléfono válido.');
      return;
    }
    setError('');
    onSubmit(form);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>Datos de envío</h3>
      {error && <p className="checkout-form__error">{error}</p>}
      <div className="checkout-form__grid">
        <label>
          <span>Nombre</span>
          <input name="firstName" value={form.firstName} onChange={handleChange} required />
        </label>
        <label>
          <span>Apellido</span>
          <input name="lastName" value={form.lastName} onChange={handleChange} required />
        </label>
        <label>
          <span>Correo</span>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          <span>Confirmar correo</span>
          <input type="email" name="confirmEmail" value={form.confirmEmail} onChange={handleChange} required />
        </label>
        <label>
          <span>Teléfono</span>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          <span>Dirección</span>
          <input name="address" value={form.address} onChange={handleChange} required />
        </label>
        <label>
          <span>Ciudad</span>
          <input name="city" value={form.city} onChange={handleChange} required />
        </label>
        <label>
          <span>Región</span>
          <input name="region" value={form.region} onChange={handleChange} required />
        </label>
      </div>
      <label>
        <span>Observaciones</span>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows="4" />
      </label>
      <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
        {isSubmitting ? 'Procesando...' : 'Confirmar pedido'}
      </button>
    </form>
  );
};

export default CheckoutForm;
