import { Link, Outlet } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin</h2>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/category">Categories</Link>
        {/* <Link to="/admin/orders">Orders</Link> */}
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}