import { createContext, useCallback, useMemo, useState } from 'react';

const CartContext = createContext(null);

const toSafeQuantity = (quantity) => {
  const numericQuantity = Number(quantity);

  if (!Number.isFinite(numericQuantity)) {
    return 1;
  }

  return Math.max(1, Math.floor(numericQuantity));
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = useCallback((item, quantity) => {
    if (!item?.id) {
      return false;
    }

    const stock = Math.max(0, Number(item.stock) || 0);

    if (stock === 0) {
      return false;
    }

    const quantityToAdd = toSafeQuantity(quantity);

    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);

      if (!existingItem) {
        return [
          ...currentCart,
          {
            ...item,
            quantity: Math.min(quantityToAdd, stock),
          },
        ];
      }

      return currentCart.map((cartItem) => {
        if (cartItem.id !== item.id) {
          return cartItem;
        }

        return {
          ...cartItem,
          ...item,
          quantity: Math.min(cartItem.quantity + quantityToAdd, stock),
        };
      });
    });

    return true;
  }, []);

  const removeItem = useCallback((itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback(
    (itemId) => cart.some((item) => item.id === itemId),
    [cart],
  );

  const getTotalQuantity = useCallback(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const getTotalPrice = useCallback(
    () => cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0),
    [cart],
  );

  const contextValue = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      clearCart,
      isInCart,
      getTotalQuantity,
      getTotalPrice,
    }),
    [addItem, cart, clearCart, getTotalPrice, getTotalQuantity, isInCart, removeItem],
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export default CartContext;
