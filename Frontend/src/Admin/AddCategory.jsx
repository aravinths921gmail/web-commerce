import { useState, useEffect } from "react";
import axios from "axios";

export default function AddCategory() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token"); // adjust key if different
    if (savedToken) setToken(savedToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name) return setError("Category name is required");
    if (!token) return setError("You must be logged in to create a category");

    try {
      const res = await axios.post(
        "http://13.49.230.178:4000/api/v1/categories/createCategory",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.message);
      setName("");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating category");
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={!token}
        />
        <button type="submit" disabled={!token}>
          Add Category
        </button>
        {!token && <p style={{ color: "orange" }}>Please log in to add categories.</p>}
      </form>
    </div>
  );
}