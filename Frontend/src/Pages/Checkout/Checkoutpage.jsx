import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const { cartId } = useParams();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [errors, setErrors] = useState({});

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price including shipping
  useEffect(() => {
    const itemsTotal = cart.reduce(
      (sum, item) =>
        sum + (item.Product?.price || 0) * (item.quantity || 0),
      0
    );

    const shippingFee = itemsTotal > 1000 ? 0 : 100;

    setTotalPrice(itemsTotal + shippingFee);
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShipping((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!shipping.name.trim()) newErrors.name = "Full name is required";
    if (!shipping.phone.trim()) newErrors.phone = "Phone number is required";
    if (!shipping.line1.trim()) newErrors.line1 = "Address is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.state.trim()) newErrors.state = "State is required";
    if (!shipping.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!shipping.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post(
        `http://13.58.192.45:4000/api/v1/orders/addOrder/${cartId}`,
        { shippingAddress: shipping, paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res.data);
      const orderId = res.data.order._id;

      navigate(`/order/${orderId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-wrapper">
      <h2 className="titleName">Checkout</h2>

      <div className="checkout-container">
        {/* LEFT: Shipping & Payment */}
        <div className="checkout-form">
          <h3>Shipping Address</h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shipping.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={shipping.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <input
            type="text"
            name="line1"
            placeholder="Address Line 1"
            value={shipping.line1}
            onChange={handleChange}
          />
          {errors.line1 && <p className="error">{errors.line1}</p>}

          <input
            type="text"
            name="city"
            placeholder="City"
            value={shipping.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}

          <input
            type="text"
            name="state"
            placeholder="State"
            value={shipping.state}
            onChange={handleChange}
          />
          {errors.state && <p className="error">{errors.state}</p>}

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shipping.postalCode}
            onChange={handleChange}
          />
          {errors.postalCode && (
            <p className="error">{errors.postalCode}</p>
          )}

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shipping.country}
            onChange={handleChange}
          />
          {errors.country && <p className="error">{errors.country}</p>}

          <h3>Payment Method</h3>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="UPI">UPI</option>
          </select>

          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div
              key={item.Product?._id}
              className="summary-item"
            >
              <span>{item.Product?.Name}</span>

              <span>
                {item.quantity} x ₹{item.Product?.price} = ₹
                {(item.Product?.price || 0) *
                  (item.quantity || 0)}
              </span>
            </div>
          ))}

          <div className="summary-total">
            <strong>Total:</strong> ₹{totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
}