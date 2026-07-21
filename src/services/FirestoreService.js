import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { productsSeed } from './productsData';

const isDemo = !import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID === 'mega-cloud-vape-shop';

const normalizeProduct = (product, id = null) => ({
  id: id ?? product.id ?? '',
  name: product.name || 'Producto sin nombre',
  brand: product.brand || 'Sin marca',
  category: product.category || 'Sin categoría',
  description: product.description || 'Sin descripción disponible.',
  price: Number(product.price) || 0,
  stock: Number(product.stock) || 0,
  sales: Number(product.sales) || 0,
  image: product.image || 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
  rating: Number(product.rating) || 0,
  isFeatured: Boolean(product.isFeatured),
  dateAdded: product.dateAdded || new Date().toISOString().slice(0, 10),
});

export const fallbackProducts = productsSeed.map((product, index) => normalizeProduct(product, product.id ?? `fallback-${index}`));

export const getProducts = async () => {
  if (isDemo) {
    return fallbackProducts;
  }

  try {
    const q = query(collection(db, 'products'), orderBy('dateAdded', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) => normalizeProduct(docSnapshot.data(), docSnapshot.id));
  } catch (error) {
    console.warn('Firestore unavailable, using fallback products.', error);
    return fallbackProducts;
  }
};

export const getProductById = async (id) => {
  if (isDemo) {
    return fallbackProducts.find((product) => product.id === id) || null;
  }

  try {
    const productDoc = await getDoc(doc(db, 'products', id));
    return productDoc.exists() ? normalizeProduct(productDoc.data(), productDoc.id) : null;
  } catch (error) {
    console.warn('Firestore unavailable for product lookup.', error);
    return fallbackProducts.find((product) => product.id === id) || null;
  }
};

export const createOrder = async (orderData) => {
  const normalizedOrderData = {
    buyer: orderData.buyer || {},
    items: (orderData.items || []).map((item) => ({
      id: item.id || '',
      name: item.name || 'Producto',
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
    })),
    total: Number(orderData.total) || 0,
    date: orderData.date || new Date().toISOString(),
    status: orderData.status || 'pending',
    createdAt: serverTimestamp(),
  };

  if (isDemo) {
    return {
      orderId: `demo-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      ...normalizedOrderData,
    };
  }

  try {
    const orderRef = await addDoc(collection(db, 'orders'), normalizedOrderData);
    return { orderId: orderRef.id, ...normalizedOrderData };
  } catch (error) {
    console.warn('Order save failed, using fallback order.', error);
    return {
      orderId: `demo-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      ...normalizedOrderData,
    };
  }
};

export const getFeaturedProducts = async () => {
  const allProducts = await getProducts();
  return allProducts.filter((product) => product.isFeatured).slice(0, 6);
};

export const getProductsByCategory = async (category) => {
  const allProducts = await getProducts();
  const normalizedCategory = decodeURIComponent(category || '').trim().toLowerCase();

  return allProducts.filter((product) => product.category?.toLowerCase() === normalizedCategory);
};

export const seedProducts = async () => {
  if (isDemo) {
    console.log('Demo mode enabled. No Firestore seed executed.');
    return;
  }

  const productsRef = collection(db, 'products');
  for (const product of fallbackProducts) {
    await addDoc(productsRef, product);
  }
};
