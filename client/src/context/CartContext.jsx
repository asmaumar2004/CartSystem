import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart`, { productId, quantity });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/cart/${productId}`, { quantity });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);