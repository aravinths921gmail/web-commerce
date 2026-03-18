import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../Context/CartContext";

export default function OrderPage() {
  const { orderid } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  // Fetch single order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:4000/api/v1/orders/getSingleOrder/${orderid}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setOrder(res.data);

        // Check if order is expired (older than 1 hour)
        const orderAge = Date.now() - new Date(res.data.createdAt).getTime();
        setIsExpired(orderAge > 3600 * 1000); 
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderid]);

  // Cancel order
  const handleCancel = async () => {
    try {
      setActionLoading(true);
      const res = await axios.patch(
        `http://localhost:4000/api/v1/orders/CancelOrder/${orderid}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data.message);
      setOrder(res.data.order);
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");
    } finally {
      setActionLoading(false);
    }
  };

  // Verify UPI payment
  const handleVerifyPayment = async () => {
    try {
      setActionLoading(true);
      const res = await axios.post(
        `http://localhost:4000/api/v1/orders/verifyPayment/${orderid}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data.message);
      setOrder(res.data.order);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment verification failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  const itemCount = (order.items || []).reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="order-container">
      <ToastContainer />
      <button className="close-text-btn" onClick={() => navigate(-1)}>Close</button>

      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
      <p><strong>Total Items:</strong> {itemCount}</p>
      <p><strong>Status:</strong> {order.orderStatus}</p>
      <p><strong>Payment Method:</strong> {order.payment.method}</p>
      <p><strong>Payment Status:</strong> {order.payment.status}</p>
      <p><strong>Transaction ID:</strong> {order.payment.transactionId || "Not available"}</p>

      {/* Expiry Message */}
      {isExpired && (
        <p className="expired-message" style={{ color: "red", fontWeight: "bold" }}>
          This order has expired. Actions like cancel or verify payment are disabled.
        </p>
      )}

      {/* Verify button only for UPI & pending payment */}
      {order.payment.method === "UPI" &&
       (order.payment.status === "pending" || !order.payment.transactionId) && (
        <button 
          onClick={handleVerifyPayment} 
          disabled={actionLoading || isExpired} 
          className="verify-btn"
        >
          Pay
        </button>
      )}

      <h3>Items</h3>
      {(order.items || []).map(item => (
        <div className="order-item" key={item.productId}>
          <div className="item-info">
            <p>{item.name || "Unknown Product"}</p>
            <p>Qty: {item.quantity || 0}</p>
            <p>₹{item.price || 0}</p>
          </div>
        </div>
      ))}

      <div className="total">Total: ₹{order.pricing?.grandTotal || 0}</div>

      {/* Cancel Order button */}
      {!["shipped", "delivered", "cancelled"].includes(order.orderStatus) && (
        <button   onClick={handleCancel}   disabled={actionLoading || isExpired}  className="cancel-btn" > Cancel Order  </button>
      )}
    </div>
  );
}