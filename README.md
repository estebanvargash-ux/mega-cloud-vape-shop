# Mega Cloud Vape Shop

Mega Cloud Vape Shop es un e-commerce SPA de productos de vapeo, construido con React 19, Vite, React Router DOM, Firebase Firestore y Context API.

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

## Ejecutar

```bash
npm run dev
```

## Insertar productos en Firestore

```bash
node seedProducts.js
```

## Publicar

```bash
npm run build
```

Luego sube la carpeta `dist` a tu hosting estático o usa Firebase Hosting.
