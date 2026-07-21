import { getApp, getApps, initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, writeBatch } from 'firebase/firestore';

const requiredEnvironmentVariables = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
  (variableName) => !process.env[variableName],
);

if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `Faltan variables de Firebase en .env: ${missingEnvironmentVariables.join(', ')}.`,
  );
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const products = [
  {
    id: 'vaporesso-xros-3-pod-kit',
    title: 'Vaporesso XROS 3 Pod Kit',
    category: 'equipos',
    price: 34990,
    stock: 15,
    description: 'Sistema de pod recargable con batería de 1000mAh y flujo de aire ajustable. Excelente sabor y durabilidad.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'voopoo-drag-4-mod-kit',
    title: 'Voopoo Drag 4 Mod Kit',
    category: 'equipos',
    price: 69990,
    stock: 8,
    description: 'Mod dual 18650 con tanque UFORCE-L, hasta 177W de potencia y control de temperatura avanzado.',
    image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'elfbar-bc10000-blue-razz-ice',
    title: 'Elfbar BC10000 - Blue Razz Ice',
    category: 'desechables',
    price: 18990,
    stock: 25,
    description: 'Pod desechable recargable con indicador de líquido y batería. Hasta 10.000 caladas de frambuesa azul helada.',
    image: 'https://images.unsplash.com/photo-1603561596112-db1d8e5e11da?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'lost-mary-os5000-kiwi-passion-fruit-guava',
    title: 'Lost Mary OS5000 - Kiwi Passion Fruit Guava',
    category: 'desechables',
    price: 14990,
    stock: 30,
    description: 'Desechable de diseño ergonómico, perfil de sabor tropical intenso y batería recargable Type-C.',
    image: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'nasty-juice-cush-man-60ml-3mg',
    title: 'Nasty Juice Cush Man 60ml (3mg)',
    category: 'eliquids',
    price: 16990,
    stock: 20,
    description: 'El legendario sabor a mango maduro con un toque sutil de menta. Alto en VG para grandes nubes.',
    image: 'https://images.unsplash.com/photo-1585238342028-4e1a6bf7f60f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'vapetasia-killer-kustard-100ml-3mg',
    title: 'Vapetasia Killer Kustard 100ml (3mg)',
    category: 'eliquids',
    price: 19990,
    stock: 12,
    description: 'El galardonado sabor a natillas de vainilla cremosas y suaves. Un clásico del vapeo desde 2018.',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=85',
  },
];

async function seedProducts() {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const productsCollection = collection(db, 'products');
  const batch = writeBatch(db);

  products.forEach(({ id, ...product }) => {
    batch.set(doc(productsCollection, id), product);
  });

  await batch.commit();
  console.log(`${products.length} productos creados o actualizados en Firestore.`);
}

seedProducts().catch((error) => {
  console.error('No se pudieron poblar los productos:', error);
  process.exitCode = 1;
});
