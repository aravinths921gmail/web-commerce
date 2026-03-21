// CartContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [pendingCartAction, setPendingCartAction] = useState(null); // NEW

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://13.49.230.178:4000/api/v1/auth/getCart", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setCart(res.data.items || []);
      setCartId(res.data._id || null);
    } catch (err) {
      console.error("Fetch cart error:", err.response?.data || err.message);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Store the attempted action
      setPendingCartAction({ product, quantity });
      alert("Login first to add to cart");
      return;
    }

    try {
      await axios.post(
        "http://13.49.230.178:4000/api/v1/auth/addCart",
        { productId: product._id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
      setPendingCartAction(null); // clear after successful add
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired or invalid
        setPendingCartAction({ product, quantity });
        alert("Login first to add to cart");
        localStorage.removeItem("token"); // optional: clear invalid token
      } else {
        const msg = err.response?.data?.message || err.message;
        console.error("Add to cart error:", msg);
        alert(`Cannot add to cart: ${msg}`);
      }
    }
  };

  // Automatically complete pending cart after login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && pendingCartAction) {
      addToCart(pendingCartAction.product, pendingCartAction.quantity);
    }
  }, [localStorage.getItem("token")]); // rerun when token changes

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
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login first to remove items");
      return;
    }
    try {
      await axios.delete(
        `http://13.49.230.178:4000/api/v1/auth/removeCartItem/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
        pendingCartAction,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};