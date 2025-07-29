import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
  
      try {
        const res = await fetch(`http://localhost:5232/api/cart/getCart/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch cart');
  
        const data = await res.json();
        const cartMap = {};
  
        data.forEach(item => {
          const name = item.product.name;
          cartMap[name] = {
            product: item.product,
            quantity: item.quantity
          };
        });
  
        setCartItems(cartMap);
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    };
  
    fetchCart();
  }, []);
  
  const [cartItems, setCartItems] = useState({});
  const addToCart = (product) => {
    const existing = cartItems[product.name];
  
    if (existing) {
      // If already in cart, just increase quantity
      increaseQty(product.name);
      return;
    }
  
    const newQty = 1;
    const updatedCart = {
      ...cartItems,
      [product.name]: {
        product: product,
        quantity: newQty
      }
    };
  
    setCartItems(updatedCart);
  
    const payload = {
      userId,
      productId: product.id,
      quantity: newQty
    };
  
    fetch('http://localhost:5232/api/cart/addCart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([payload])
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to sync cart with backend');
        return res.json();
      })
      .then(data => console.log('Synced with DB:', data))
      .catch(err => console.error('Cart sync error:', err));
  };
  
  const syncQuantityToBackend = (name, newQty) => {
    const item = cartItems[name];
    if (!item) return;
  
    const payload = {
      userId,
      productId: item.product.id,
      quantity: newQty
    };
  
    fetch('http://localhost:5232/api/cart/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update cart on backend');
        return res.json();
      })
      .then(data => console.log('Cart updated in DB:', data))
      .catch(err => console.error('Cart update error:', err));
  };

  const increaseQty = (name) => {
    const existing = cartItems[name];
    if (!existing) return;
  
    const newQty = existing.quantity + 1;
  
    const updated = {
      ...cartItems,
      [name]: { ...existing, quantity: newQty }
    };
  
    setCartItems(updated);
    syncQuantityToBackend(name, newQty);
  };
  
  const decreaseQty = (name) => {
    const existing = cartItems[name];
    if (!existing) return;
  
    const newQty = existing.quantity - 1;
    const updated = { ...cartItems };
  
    if (newQty <= 0) {
      delete updated[name];
    } else {
      updated[name] = { ...existing, quantity: newQty };
    }
  
    setCartItems(updated);
    syncQuantityToBackend(name, newQty);
  };

  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQty, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
