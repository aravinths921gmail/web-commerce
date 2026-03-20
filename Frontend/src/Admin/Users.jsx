import { useEffect, useState, useContext } from "react";
import axios from "axios";
import  AppContext  from "../Context/AppContext";

export default function Users() {
  // const [users, setUsers] = useState([]);

  const { users, setUsers } = useContext(AppContext);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://13.49.230.178:4000/api/v1/auth/getUser",
          {
            withCredentials: true // sends cookie
          }
        );

        setUsers(res.data);
      }
      
      catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://13.49.230.178:4000/api/v1/auth/deleteUser/${id}`, { withCredentials: true }); //send cookies

      setUsers(users.filter((u) => u._id !== id));
    }
    
    catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div>
      <h1>Users</h1>
 
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}