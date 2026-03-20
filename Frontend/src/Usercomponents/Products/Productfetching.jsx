import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./Productfetching.css";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";
import emailjs from "@emailjs/browser";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import CalorieTracker from "../../Pages/dashboard/Calorietracker";

export default function Productfetching({ darkMode = false, categoryId }) {
  const { searchQuery } = useContext(SearchContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [likedProducts, setLikedProducts] = useState({});

  const Enquire = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // console.log("Current wishlist in Navbars:", wishlist);

  const [animateHeart, setAnimateHeart] = useState({});

  const toggleLike = (id) => {
    // Toggle the liked state
    setLikedProducts(prev => {
      const isLiked = !!prev[id];
      return { ...prev, [id]: !isLiked };
    });

    // Trigger the animation
    setAnimateHeart(prev => ({ ...prev, [id]: true }));

    // Remove the animation class after it finishes
    setTimeout(() => {
      setAnimateHeart(prev => ({ ...prev, [id]: false }));
    }, 300); // 300ms matches the CSS animation duration
  };


  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      customer_name: customerName,
      message: message,
      customer_email: customerEmail,
      product_name: selectedProduct.Name,
      price: selectedProduct.price,
      stock: selectedProduct.stock,
      category: selectedProduct.category?.name,
      product_id: selectedProduct._id
    };


    emailjs.send(
      "service_b6eufaw",
      "template_kan3g1i",
      templateParams,
      "d-SRWpXZrh-7JnNRO"
    )
      .then(() => {
        alert("Enquiry sent successfully!");
        setShowModal(false);
        setCustomerName("");
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to send enquiry");
      });
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
  };

  useEffect(() => { fetchProducts() }, [categoryId, searchQuery]);

  //   useEffect(() => {
  //   const storedWishlist = localStorage.getItem("wishlist");
  //   if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishlist));
  // }, [wishlist]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://13.49.230.178:4000/api/v1/auth/productFetch");

      let fetchedProducts = res.data;

      if (categoryId) {
        fetchedProducts = fetchedProducts.filter(
          (p) => p.category?._id === categoryId
        );
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        fetchedProducts = fetchedProducts.filter(
          (p) =>
            p.Name.toLowerCase().includes(query) ||
            p.category?.name.toLowerCase().includes(query)
        );
      }

      const shuffledProducts = shuffleArray(fetchedProducts);

      setProducts(shuffledProducts);

    }

    catch (error) {
      console.log(error);
    }

    finally {
      setLoading(false)
    }
  };

  const truncateText = (text, limit = 50) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  if (loading) {
    return (
      <div className="products-container">
        {[...Array(6)].map((_, index) => (<div key={index} className="product-card">
          <div className="skeleton skeleton-image"></div>

          <div className="skeleton-body">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-price"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={`products-container ${darkMode ? "dark" : ""}`}>
        {products.map((product) => (<Card key={product._id} className={`product-card ${darkMode ? "dark-card" : ""}`} >

          <div className="heart-container">
            <button  className="wishheart"  onClick={() => {  console.log("Toggling wishlist for", product.Name);  toggleWishlist(product)  }}  >
              <i
                className={`fa-solid fa-heart ${animateHeart[product._id] ? "heart-pop" : ""}`}
                style={{ color: wishlist.some(p => p._id === product._id)  ? "rgb(255, 123, 0)"  : "rgb(228, 228, 228)"  }} >
                </i> 
            </button>

          </div>

          {product.images?.length > 0 && (
            <Card.Img variant="top" src={`http://13.49.230.178:4000/uploads/${encodeURIComponent(product.images[0])}`} className="product-image" />)}

          <Card.Body>  <Card.Title className="product-title">  {truncateText(product.Name, 30)} </Card.Title>

            <Card.Text className="product-desc"> {truncateText(product.description, 60)} </Card.Text>

            <h5 className="product-price">₹{product.price}</h5>
            <p className="product-category">{product.category?.name}</p>



            <div className="product-buttons"> <button className="btn-cart" onClick={() => { console.log("Adding product:", product); addToCart(product)}}>Add to Cart</button>

              <button className="btn-enquiry" onClick={() => Enquire(product)} > Enquiry  </button> </div>
          </Card.Body>
        </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>  <Modal.Title>Send Enquiry</Modal.Title> </Modal.Header>
      <Modal.Body>

          {selectedProduct && (
            <>
              <p><strong>Product:</strong> {selectedProduct.Name}</p>
              <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
              <p><strong>Category:</strong> {selectedProduct.category?.name}</p>
            </>
          )}

          <input type="text" placeholder="Your Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-control mb-3" />
<div className="separator">
          <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" />
</div>
          <input type="email" placeholder="Your Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="form-control mb-3" />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>  Cancel  </Button>

          <Button variant="primary" onClick={sendEmail}>  Send Email </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

