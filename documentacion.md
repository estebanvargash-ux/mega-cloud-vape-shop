# INFORME DE PROYECTO FINAL - REACT JS
**Curso:** Desarrollo Front-End con React  
**Proyecto:** Mega Cloud Vape Shop (E-Commerce SPA)  
**Estudiante:** Esteban Vargas  

---

## 1. Portada y Justificación del E-Commerce
El proyecto **Mega Cloud Vape Shop** nace como una solución digital moderna para la comercialización de equipos de vapeo, e-liquids y desechables. Se eligió esta temática para diseñar una interfaz oscura (*dark mode*), atractiva y dirigida a un público especializado, priorizando una navegación fluida e intuitiva sin recargas de página (Single Page Application).

## 2. Detalle Técnico de Implementación
- **Single Page Application:** La navegación no recarga el navegador gracias a `react-router-dom`.
- **Componentización:**
  - `NavBar` / `CartWidget`: Navegación responsive con indicador dinámico de cantidad de ítems.
  - `ItemListContainer` / `ItemList` / `Item`: Filtrado por categorías (`/category/:id`) directamente desde Firestore.
  - `ItemDetailContainer` / `ItemDetail` / `ItemCount`: Vista en detalle de producto con control estricto de stock.
  - `Cart` / `Checkout`: Gestión de compras, cálculo de total en $ CLP y generación automática del ID de orden en Firestore.
- **Backend as a Service (Firebase):** Conexión segura mediante variables de entorno (`.env`), lectura de documentos en tiempo real y escritura de órdenes de compra en la colección `orders`.

## 3. Reflexiones sobre el Proceso
El desarrollo de esta SPA permitió consolidar conceptos fundamentales del desarrollo web moderno con React 19. El uso de `Context API` facilitó una comunicación limpia entre componentes lejanos en la jerarquía, mientras que la integración con Firestore demostró el poder de las arquitecturas serverless para prototipar e-commerces funcionales en tiempo récord.