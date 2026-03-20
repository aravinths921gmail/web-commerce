import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FetchOrder.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://13.58.192.45:4000/api/v1/orders/getOrder", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://13.58.192.45:4000/api/v1/orders/deleteOrder/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="orders-container">
      <ToastContainer />
      <h2>Your Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p>
            <strong>Order ID:</strong> <span>{order._id}</span>
          </p>
          <p>
            <strong>Status:</strong> <span>{order.orderStatus}</span>
          </p>
          <p>
            <strong>Payment:</strong>{" "}
            <span className={`payment-status ${order.payment.status.toLowerCase()}`}>
              {order.payment.status}
            </span>
          </p>
          {order.payment.status === "paid" && (
            <p>
              <strong>Transaction ID:</strong> <span>{order.payment.transactionId}</span>
            </p>
          )}
          <p>
            <strong>Total:</strong> <span>₹{order.pricing.grandTotal}</span>
          </p>

          <button className="view-order-btn" onClick={() => navigate(`/order/${order._id}`)}>
            View Order Details
          </button>

          <button className="delete-btn" onClick={() => deleteOrder(order._id)}>
            Delete Order
          </button>
        </div>
      ))}
    </div>
  );
}