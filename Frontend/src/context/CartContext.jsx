import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const items = localStorage.getItem('cartItems');
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(cartItems.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map((x) => x._id === id ? { ...x, qty } : x));
  };

  const updateCartItemImage = (id, customImageUrl) => {
    setCartItems(cartItems.map((x) => x._id === id ? { ...x, customImageUrl } : x));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQty, updateCartItemImage,
      isCartOpen, toggleCart, cartTotal, cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};
