import { useContext } from "react";
import AppContext from "../Context/AppContext";

export default function Dashboard() {

  const { users, products } = useContext(AppContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Users: {users.length}</p>
      <p>Total Products: {products.length}</p>
      <p>Total Orders: 0</p>
    </div>
  );
}

