import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'mega-cloud-cart';

const readStoredCart = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn('No se pudo leer el carrito guardado.', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(readStoredCart);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn('No se pudo guardar el carrito.', error);
    }
  }, [cart]);

  const addItem = (product, quantity = 1) => {
    if (!product) {
      return false;
    }

    const normalizedQuantity = Math.max(1, Number(quantity) || 1);
    const maxStock = Number(product.stock) || 0;

    if (maxStock <= 0) {
      return false;
    }

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      const nextQuantity = existing ? existing.quantity + normalizedQuantity : normalizedQuantity;
      const safeQuantity = Math.min(nextQuantity, maxStock);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: safeQuantity } : item,
        );
      }

      return [...current, { ...product, quantity: safeQuantity }];
    });

    return true;
  };

  const updateItemQuantity = (id, quantity) => {
    const normalizedQuantity = Number(quantity);

    if (!Number.isFinite(normalizedQuantity)) {
      return;
    }

    setCart((current) => {
      if (normalizedQuantity <= 0) {
        return current.filter((item) => item.id !== id);
      }

      return current.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(normalizedQuantity, Number(item.stock) || normalizedQuantity) } : item,
      );
    });
  };

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const getQuantity = (id) => cart.find((item) => item.id === id)?.quantity || 0;

  const getTotal = () => cart.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);

  const totalItems = cart.reduce((acc, item) => acc + Number(item.quantity), 0);

  const value = {
    cart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    isInCart,
    getQuantity,
    getTotal,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
