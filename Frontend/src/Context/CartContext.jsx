import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);


  const fetchCart = async () => {
    try {
    const res = await axios.get("http://localhost:4000/api/v1/auth/getCart", { 
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } 
    });

    // Set the active cart items and cartId
    setCart(res.data.items || []);
    setCartId(res.data._id || null);

  } catch (err) {
    console.error("Fetch cart error:", err.response?.data || err.message);
  }
};

  const addToCart = async (product, quantity = 1) => {
    try {
      await axios.post(
        "http://localhost:4000/api/v1/auth/addCart",
        { productId: product._id, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchCart();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      console.error("Add to cart error:", msg);
      alert(`Cannot add to cart: ${msg}`);
    }
  };

  const increaseQty = async (productId) => {
    const item = cart.find(i => i.Product._id === productId);
    if (!item) return;
    await addToCart({ _id: productId }, 1);
  };

  const decreaseQty = async (productId) => {
    const item = cart.find(i => i.Product._id === productId);
    if (!item || item.quantity <= 1) return;
    await addToCart({ _id: productId }, -1);
  };


  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/auth/removeCartItem/${productId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Remove item error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        fetchCart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};