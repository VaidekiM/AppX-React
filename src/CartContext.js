import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (name) => {
    setCartItems(prev => ({ ...prev, [name]: 1 }));
  };

  const increaseQty = (name) => {
    setCartItems(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const decreaseQty = (name) => {
    setCartItems(prev => {
      const newQty = (prev[name] || 0) - 1;
      if (newQty <= 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: newQty };
    });
  };

  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQty, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
