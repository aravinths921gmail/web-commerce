import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RefundPage.css";

export default function RefundPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchRefundedOrders();
  }, []);

  const fetchRefundedOrders = async () => {
    try {
      const res = await axios.get("http://13.49.230.178:4000/api/v1/orders/getRefundedOrders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch refunded orders");
    }
  };

  

  const deleteRefund = async (id) => {
    try {
        // console.log("Deleting refund ID:", id); 
      await axios.delete(`http://13.49.230.178:4000/api/v1/orders/deleteRefund/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders((prev) => prev.filter((r) => r._id !== id));
      toast.success("Refund deleted successfully");
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete refund");
    }
  };

  return (
    <div className="refund-orders-container">
      <ToastContainer />
      <h2>Refunded Orders</h2>

      {orders.length === 0 && <p>No refund orders found</p>}

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p>Order ID: <span>{order._id}</span></p>
          <p>
            Refund Status:{" "}
            <span className={`payment-status ${order.payment.status.toLowerCase()}`}>
              {order.payment.status}
            </span>
          </p>
          <p>Total: <span>₹{order.pricing.grandTotal}</span></p>

          <button className="delete-btn" onClick={() => deleteRefund(order._id)}>
            Delete Refund
          </button>
        </div>
      ))}
    </div>
  );
}