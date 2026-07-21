const Filters = ({ filters, onChange, onSortChange }) => (
  <section className="filters" aria-label="Filtros de productos">
    <label>
      <span>Marca</span>
      <select name="brand" value={filters.brand} onChange={onChange}>
        <option value="">Todas</option>
        <option value="Voopoo">Voopoo</option>
        <option value="Vaporesso">Vaporesso</option>
        <option value="Luxe">Luxe</option>
        <option value="Geekvape">Geekvape</option>
        <option value="Rifbar">Rifbar</option>
      </select>
    </label>
    <label>
      <span>Categoría</span>
      <select name="category" value={filters.category} onChange={onChange}>
        <option value="">Todas</option>
        <option value="Pods">Pods</option>
        <option value="Kits">Kits</option>
        <option value="Desechables">Desechables</option>
        <option value="Sales de Nicotina">Sales de Nicotina</option>
        <option value="Líquidos">Líquidos</option>
        <option value="Resistencias">Resistencias</option>
        <option value="Accesorios">Accesorios</option>
      </select>
    </label>
    <label>
      <span>Precio</span>
      <select name="price" value={filters.price} onChange={onChange}>
        <option value="">Todos</option>
        <option value="under-20000">Menos de 20.000</option>
        <option value="20000-40000">20.000 - 40.000</option>
        <option value="over-40000">Más de 40.000</option>
      </select>
    </label>
    <label>
      <span>Stock</span>
      <select name="stock" value={filters.stock} onChange={onChange}>
        <option value="">Todos</option>
        <option value="available">Con stock</option>
        <option value="out">Sin stock</option>
      </select>
    </label>
    <label>
      <span>Ordenar</span>
      <select value={filters.sort} onChange={onSortChange}>
        <option value="featured">Destacados</option>
        <option value="price-desc">Mayor precio</option>
        <option value="price-asc">Menor precio</option>
        <option value="sales">Más vendidos</option>
        <option value="recent">Más recientes</option>
      </select>
    </label>
  </section>
);

export default Filters;
