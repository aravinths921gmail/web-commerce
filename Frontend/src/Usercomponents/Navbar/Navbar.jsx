import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from "react-router-dom";
import SignupModal from "./SignupModal";
import styles from '../Navbar/Navbar.module.css';
import logoname from '../../assets/images/logobg.png';
import { SearchContext } from "../../Context/SearchContext";
import { WishlistContext } from "../../Context/WishlistContext";
import Modal from "react-bootstrap/Modal"; 
import { CartContext } from "../../Context/CartContext";

export default function Navbars() {

  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  const [darkMode, setdarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [showModal, setShowModal] = useState(false);
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce(
  (total,item)=> total + item.quantity,
  0
);


//   useEffect(() => {
//   const storedWishlist = localStorage.getItem("wishlist");
//   if (storedWishlist && storedWishlist.length > 0) {
//     // We can't update context, so just leave it as read-only
//     console.log("Loaded wishlist from localStorage:", JSON.parse(storedWishlist));
//   }
// }, []);

  // Define mapping once, lowercase keys for consistency
  const categoryMap = {
    "treadmills": { id: "69aeecd2fb1fa9b52efa3486" },
    "elliptical trainer": { id: "69aeece3fb1fa9b52efa3489" },
    "spin bikes": { id: "69aeecf3fb1fa9b52efa348c" },
    "dumbells": { id: "69aeed00fb1fa9b52efa348f" },
    "yoga mat & rope": { id: "69aeed05fb1fa9b52efa3492" },
    "lifting barbells": { id: "69aeed12fb1fa9b52efa3495" },
  };

  const openCategory = (name) => {
    if (!name) return;
    const normalized = name.toLowerCase().trim();
    const entry = categoryMap[normalized];
    if (!entry) return;
    navigate(`/category/${entry.id}`);
  };

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const modeChange = () => setdarkMode(!darkMode);

  const [activeCategory, setActiveCategory] = useState("commercial");

  const products = {
    commercial: [
      { name: "Treadmills", img: "/src/assets/images/products/treadmills.png" },
      { name: "Elliptical Trainer", img: "/src/assets/images/products/elliptical.png" },
      { name: "Spin Bikes", img: "/src/assets/images/products/spinbike.png" },
    ],
    home: [
      { name: "Dumbells", img: "/src/assets/images/products/home/dumbells.png" },
      { name: "Yoga Mat & rope", img: "/src/assets/images/products/home/yoga-mat.png" },
      { name: "Lifting Barbells", img: "/src/assets/images/products/home/bands.png" },
    ],
  };

  // Enquiry modal state
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  // Open enquiry modal from wishlist
  const EnquireFromWishlist = (product) => {
    setEnquiryProduct(product);
    setShowEnquiryModal(true);
  };

  return (
    <>
      <Container className={styles.customContainer}>
        <div className={styles.shortContainer}>

          <Link to="/"><img className={styles.logo} src={logoname} alt="logo" /></Link>
          <Link to="/"> <i className="fa-solid fa-house" style={{ color: "orange" }}></i></Link>
          
<div className={styles.smallContainer}>
          {/* PRODUCTS DROPDOWN */}
          <NavDropdown
            className={styles.product}
            title="PRODUCTS"
            id="products-dropdown"
            autoClose="outside">
            <div className={styles.megaMenu}>
              <div className={styles.leftMenu}>
                <p onClick={() => setActiveCategory("commercial")}> Commercial Fitness Solutions </p>
                <p onClick={() => setActiveCategory("home")}> Fitness for Your Home </p>
              </div>
            </div>

            <div className={styles.productGrid}>
              {products[activeCategory].map((item, index) => (
                <div key={index} className={styles.productCard} onClick={() => openCategory(item.name)}>
                  <img src={item.img} alt={item.name} /> <span>{item.name}</span>
                </div>
              ))}
            </div>
          </NavDropdown>

          <NavDropdown  className={styles.category}  title="DASHBOARD"  id="category-dropdown"  autoClose="true">
                <div className={styles.leftCategory}>
                <p onClick={() => navigate("/WorkoutGuide")}>Workout guide</p>
                <p onClick={() => navigate("/CalorieTracker")}>Calorie tracker</p>
</div>

</NavDropdown>

<NavDropdown
  className={styles.support}
  title="SUPPORT"
  id="support-dropdown"
  autoClose="outside"
>
  <div className={styles.megasupport}>
    <div className={styles.leftsupport}>
      <p onClick={() => navigate("/installation-guide")}>
        Installation Guide
      </p>

      <p onClick={() => navigate("/maintenance-tips")}>
        Maintenance Tips
      </p>

      <p onClick={() => navigate("/help-center")}>
        Help Center
      </p>

      <p onClick={() => navigate("/contact-us")}>
        Contact Us
      </p>
    </div>
  </div>
</NavDropdown>

<NavDropdown
  className={styles.support}
  title="MORE"
  id="more-dropdown"
  autoClose="outside"
>
  <div className={styles.megamore}>
    <div className={styles.leftmore}>
      <p onClick={() => navigate("/orders")}>
        Orders
      </p>

      <p onClick={() => navigate("/refunds")}>
        Returns & refunds
      </p>
    </div>
  </div>
  
</NavDropdown>
</div>
          {/* Other dropdowns remain unchanged */}

          <Form>
            <InputGroup size="sm" className={styles.searchInput}>
              <Form.Control
                type="search"
                className={styles.Searchbar}
                placeholder="Search here"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className={styles.searchButton} onClick={(e) => e.preventDefault()}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputGroup>
          </Form>

          <nav className={styles.navCategory}>
            {/*  Wishlist */}
            <div className={styles.wishlistContainer}>
              <div className={styles.wishlistLabel}>
                <i className={`fa-solid fa-heart ${styles.heartIcon}`}></i>
                Wishlist ({wishlist.length})
              </div>

              <div className={styles.wishlistDropdown}>
                {wishlist.length > 0 ? (
                  wishlist.map(item => (
                    <div
                      key={item._id}
                      className={styles.wishlistItem}
                      onClick={() => EnquireFromWishlist(item)}
                    >
                      <img src={`http://localhost:4000/uploads/${item.images?.[0]}`} alt={item.Name} />
                      <div>
                        <p>{item.Name}</p>
                        <span>₹{item.price}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items in wishlist</p>
                )}
              </div>
            </div>

            <Nav.Link className={styles.cart} onClick={() => navigate("/cart")}>  <i className={`fa-solid fa-cart-shopping ${styles.cartIcon}`}></i>Cart({cartCount})</Nav.Link>  

            <Nav.Link onClick={() => setShowModal(true)}>Signup</Nav.Link>

            <SignupModal show={showModal} handleClose={() => setShowModal(false)} />

            <Nav.Link onClick={modeChange}>
              {darkMode ? <i className={`fa-solid fa-sun ${styles.sunIcon}`}></i> :
                <i className={`fa-solid fa-moon ${styles.modeIcon}`}></i>}
            </Nav.Link>

          </nav>
        </div>

      </Container>

      {/* Enquiry Modal */}
      <Modal show={showEnquiryModal} onHide={() => setShowEnquiryModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {enquiryProduct && (
            <>
              <p><strong>Product:</strong> {enquiryProduct.Name}</p>
              <p><strong>Price:</strong> ₹{enquiryProduct.price}</p>
              <p><strong>Category:</strong> {enquiryProduct.category?.name}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEnquiryModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}