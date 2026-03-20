import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const { 
    cart, 
    increaseQty, 
    decreaseQty, 
    removeItem, 
    cartId,
    addToCart
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Total price calculation
  const totalPrice = cart.reduce(
    (total, item) => total + (item.Product?.price || 0) * (item.quantity || 0),
    0
  );
  const totalPriceFormatted = totalPrice.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  const handleCheckout = () => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty. Add products before proceeding to checkout.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    navigate(`/checkout/${cartId}`);
  };

  return (
    <div className="cart-wrapper">
      <ToastContainer />
      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-container">
        {/* LEFT SIDE: PRODUCTS */}
        <div className="cart-products">
          {cart.length === 0 && <p className="empty-cart">No products added</p>}

          {cart.map(item => (
            <div key={item.Product?._id || Math.random()} className="cart-item">
              {/* Product Image */}
              <div className="cart-img-wrapper">
                <img
                  src={`http://13.49.230.178:4000/uploads/${item.Product?.images?.[0] || "placeholder.jpg"}`}
                  alt={item.Product?.Name || "Product"}
                  className="cart-img"
                />
              </div>

              {/* Product Details */}
              <div className="cart-details">
                <h4 className="product-name">{item.Product?.Name || "Unknown Product"}</h4>
                <p className="cart-category">{item.Product?.category?.name || "Uncategorized"}</p>

                {/* Quantity Controls */}
                <div className="qty-container">
                  <button 
                    onClick={() => item.Product && decreaseQty(item.Product._id)} 
                    className="qty-btn" 
                    disabled={item.quantity <= 1}
                  > - </button>
                  <span className="qty-count">{item.quantity || 0}</span>
                  <button 
                    onClick={() => item.Product && increaseQty(item.Product._id)} 
                    className="qty-btn"
                  > + </button>
                </div>

                {/* Remove Item */}
                <div className="cart-actions">
                  <button 
                    className="remove-btn" 
                    onClick={() => item.Product && removeItem(item.Product._id)}
                  > Remove </button>
                </div>
              </div>

              {/* Price */}
              <div className="cart-price">
                ₹{((item.Product?.price || 0) * (item.quantity || 0)).toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{totalPriceFormatted}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}