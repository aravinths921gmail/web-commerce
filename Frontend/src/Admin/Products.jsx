import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../Context/AppContext";

export default function Products() {
  const { products, setProducts } = useContext(AppContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]); // ← store uploaded files
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({
    Name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const getToken = () => localStorage.getItem("token")?.replace(/"/g, "");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://13.58.192.45:4000/api/v1/auth/productFetch",
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        setProducts(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
        } else {
          setError(err.response?.data?.message || "Failed to fetch products");
        }
      }
    };
    fetchProducts();
  }, []);

  // Add product with image upload
  const addProduct = async () => {
    setError("");

    if (!name || !description || price === "" || stock === "" || !category || images.length === 0) {
      return setError("Fill all fields including images");
    }

    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);

      images.forEach((file) => formData.append("images", file)); // append multiple files

      const res = await axios.post(
        "http://13.58.192.45:4000/api/v1/auth/ProductCreate",
        formData,
        { headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "multipart/form-data" } }
      );

      setProducts([...products, res.data]);
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImages([]);
    } catch (err) {
      setError(err.response?.data?.message || "Add product failed");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://13.58.192.45:4000/api/v1/auth/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  // Update product
  const updateProduct = async (id) => {
    try {
      const res = await axios.put(
        `http://13.58.192.45:4000/api/v1/auth/updateProduct/${id}`,
        {
          Name: editFields.Name,
          description: editFields.description,
          price: Number(editFields.price),
          stock: Number(editFields.stock),
          category: editFields.category,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      const updated = res.data.product || res.data;
      setProducts(products.map((p) => (p._id === id ? updated : p)));
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style ={{padding : "20px"}}> Product </h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* FORM STAYS ON TOP */}
      <div className="product-form" style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
        maxWidth: "500px"
      }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="file" multiple accept="image/*" onChange={(e) => setImages([...e.target.files])} />
        <button onClick={addProduct}>Add</button>
      </div>

      {/* PRODUCT GRID */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "10px",
        maxHeight: "70vh",
        overflowY: "auto",
        borderTop: "1px solid #ccc"
      }}>
        {products.map((p) => (
          <div key={p._id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            width: "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            {editingId === p._id ? (
              <>
                <input
                  value={editFields.Name}
                  onChange={(e) => setEditFields({ ...editFields, Name: e.target.value })}
                />
                <button onClick={() => updateProduct(p._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{p.Name}</strong> - ₹{p.price}
                <div style={{ display: "flex", gap: "5px", margin: "10px 0" }}>
                  {p.images && p.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://13.58.192.45:4000/uploads/${encodeURIComponent(img)}`}
                      alt={p.Name}
                      width="80"
                      style={{ borderRadius: "4px", objectFit: "cover", height: "80px" }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    setEditingId(p._id);
                    setEditFields({
                      Name: p.Name,
                      description: p.description,
                      price: p.price,
                      stock: p.stock,
                      category: p.category,
                    });
                  }}
                  style={{ marginBottom: "5px" }}
                >
                  Edit
                </button>
                <button onClick={() => deleteProduct(p._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}