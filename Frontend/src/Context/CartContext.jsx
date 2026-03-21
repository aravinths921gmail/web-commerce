import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [pendingCartAction, setPendingCartAction] = useState(null);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(
        "http://13.49.230.178:4000/api/v1/auth/getCart",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items || []);
      setCartId(res.data._id || null);
    } catch (err) {
      console.error("Fetch cart error:", err.response?.data || err.message);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Store attempted action and show toast
      setPendingCartAction({ product, quantity });
      toast.info("Login first to add to cart", { position: "top-center", autoClose: 3000 });
      return;
    }

    try {
      await axios.post(
        "http://13.49.230.178:4000/api/v1/auth/addCart",
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
      setPendingCartAction(null); // clear pending after success
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired/invalid → treat as login required
        setPendingCartAction({ product, quantity });
        toast.info("Login first to add to cart", { position: "top-center", autoClose: 3000 });
        localStorage.removeItem("token"); // optional: clear invalid token
      } else {
        const msg = err.response?.data?.message || err.message;
        console.error("Add to cart error:", msg);
        toast.error(`Cannot add to cart: ${msg}`, { position: "top-center", autoClose: 3000 });
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && pendingCartAction) {
      addToCart(pendingCartAction.product, pendingCartAction.quantity);
    }
  }, [localStorage.getItem("token")]);

  const increaseQty = async (productId) => {
    const item = cart.find((i) => i.Product._id === productId);
    if (!item) return;
    await addToCart({ _id: productId }, 1);
  };

  const decreaseQty = async (productId) => {
    const item = cart.find((i) => i.Product._id === productId);
    if (!item || item.quantity <= 1) return;
    await addToCart({ _id: productId }, -1);
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Login first to remove items", { position: "top-center", autoClose: 3000 });
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
      toast.error("Failed to remove item", { position: "top-center", autoClose: 3000 });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) fetchCart();
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