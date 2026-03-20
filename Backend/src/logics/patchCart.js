import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext"; // your CartContext
import Navbars from "../../Components/Navbar/Navbars";    // sticky navbar
import "./CartPage.css";

export default function CartPage() {
  const { cart, fetchCart, updateQuantity, removeItem } = useContext(CartContext);

  useEffect(() => {
    fetchCart(); // fetch cart from backend on page load
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.Product.price * item.quantity,
    0
  );

  return (
    <>
      <Navbars /> {/* Sticky navbar at the top */}

      <div className="cart-wrapper">
        <h2 className="cart-title">Your Cart</h2>

        <div className="cart-container">
          {/* LEFT SIDE: Products */}
          <div className="cart-products">
            {cart.length === 0 && <p>No products added</p>}

            {cart.map((item) => (
              <div key={item.Product._id} className="cart-item">
                <img
                  src={`http://13.58.192.45:4000/uploads/${item.Product.images?.[0]}`}
                  className="cart-img"
                  alt={item.Product.Name}
                />

                <div className="cart-details">
                  <h4>{item.Product.Name}</h4>
                  <p className="cart-category">{item.Product.category?.name}</p>

                  <div className="qty-container"> <button  onClick={() =>  item.quantity > 1 &&  updateQuantity(item.Product._id, item.quantity - 1)  } className="qty-btn"  > - </button>
                    <span>{item.quantity}</span>
                    <button   onClick={() => updateQuantity(item.Product._id, item.quantity + 1)  }  className="qty-btn" >  +  </button>
                  </div>

                  <button  className="remove-btn"  onClick={() => removeItem(item.Product._id)} >  Remove </button>
                </div>

                <div className="cart-price">
                  ₹{item.Product.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: Summary */}
          {cart.length > 0 && (
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <button className="checkout-btn">Place Order</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}