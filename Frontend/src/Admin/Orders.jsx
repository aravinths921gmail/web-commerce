import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./AdminOrders.css"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders and refunds
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all orders
        const ordersRes = await axios.get("http://13.58.192.45:4000/api/admin/orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Fetch all refunded orders
        const refundsRes = await axios.get(
          "http://13.58.192.45:4000/api/v1/orders/getRefundedOrders",
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setOrders(ordersRes.data);
        setRefunds(refundsRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders or refunds");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete order by ID
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://13.58.192.45:4000/api/admin/order/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };

  // Delete refund by ID
  const deleteRefund = async (id) => {
    try {
      await axios.delete(`http://13.58.192.45:4000/api/v1/orders/deleteRefund/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRefunds((prev) => prev.filter((r) => r._id !== id));
      toast.success("Refund entry deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete refund");
    }
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="admin-orders-container">
      <ToastContainer />

      <h1>All Orders</h1>
      {orders.length === 0 && <p>No orders found</p>}
      {orders.map((o) => (
        <div key={o._id} className="order-card">
          <p>
            <strong>User:</strong> {o.username || o.user?.name || "Unknown"}
          </p>
          <p>
            <strong>Order ID:</strong> {o._id}
          </p>
          <p>
            <strong>Status:</strong> {o.status || o.orderStatus}
          </p>
          <p>
            <strong>Total:</strong> ₹{o.pricing?.grandTotal || 0}
          </p>
          <button onClick={() => deleteOrder(o._id)} className="delete-btn">
            Delete Order
          </button>
        </div>
      ))}

      <h1>Refunded Orders</h1>
      {refunds.length === 0 && <p>No refund orders found</p>}
      {refunds.map((r) => (
        <div key={r._id} className="refund-card">
          <p>
            <strong>User:</strong> {r.username || r.user?.name || "Unknown"}
          </p>
          <p>
            <strong>Order ID:</strong> {r._id}
          </p>
          <p>
            <strong>Refund Status:</strong>{" "}
            <span className={`payment-status ${r.payment?.status?.toLowerCase()}`}>
              {r.payment?.status || "Unknown"}
            </span>
          </p>
          <p>
            <strong>Total:</strong> ₹{r.pricing?.grandTotal || 0}
          </p>
          <button onClick={() => deleteRefund(r._id)} className="delete-btn">
            Delete Refund
          </button>
        </div>
      ))}
    </div>
  );
}