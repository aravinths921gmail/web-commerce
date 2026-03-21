import { Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import styles from "../Navbar/SignupModal.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupModal({ show, handleClose, productId }) {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userdetails, setuserdetails] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", backend: "" });

  // ================= HELPERS =================
  const isUserLoggedIn = () => !!localStorage.getItem("token");

  const validateEmail = (email) => {
    const emailRegex = /^(?=.*\d)[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com)$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Email must include a number and end with @gmail.com or @email.com";
    return "";
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
    if (!password) return "Password is required";
    if (!passwordRegex.test(password)) return "Password must include uppercase, lowercase, number, and symbol";
    return "";
  };

  // ================= ADD TO CART =================
const handleAddToCart = async () => {
  const token = localStorage.getItem("token");

  //  If no token, show toast and stop
if (!token) {
  toast.info("Please login first", { position: "top-center" });
  setIsLogin(true); // switch to login form
  handleClose(false); // open modal
  return;
}

  //  Otherwise, proceed to add to cart
  try {
    const response = await axios.post(
      "http://13.49.230.178:4000/api/v1/cart/add",
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // ensures cookies are sent if your backend uses them
      }
    );

    toast.success("Item added to cart!", { position: "top-center", autoClose: 2000 });
  } catch (error) {
    console.error("Add to cart error:", error.response?.data || error.message);
    toast.error(
      error.response?.data?.message || "Failed to add to cart. Try again.",
      { position: "top-center", autoClose: 3000 }
    );
  }
};

  // ================= SUBMIT HANDLER =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", backend: "" });

    if (isLogin) {
      // ===== LOGIN =====
      if (!userdetails.email) return setErrors({ email: "Email is required", password: "", backend: "" });
      if (!userdetails.password) return setErrors({ email: "", password: "Password is required", backend: "" });

      try {
        const response = await axios.post(
          "http://13.49.230.178:4000/api/v1/auth/Loginpost",
          userdetails
        );

       const token = response.data.token;
if (token) {
  localStorage.setItem("token", response.data.token);
  toast.success("Login successful!", { position: "top-center", autoClose: 2000 });
  setuserdetails({ email: "", password: "" });
  handleClose();
} 

        // Optional: reload to update cart context
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Invalid email or password", { position: "top-center", autoClose: 3000 });
      }
      return;
    }

    // ===== SIGNUP =====
    const emailError = validateEmail(userdetails.email);
    const passwordError = validatePassword(userdetails.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError, backend: "" });
      return;
    }

    try {
      await axios.post(
        "http://13.49.230.178:4000/api/v1/auth/userpost",
        userdetails
      );

      toast.success("Account created successfully!", { position: "top-center", autoClose: 2500 });
      setuserdetails({ email: "", password: "" });
      handleClose();
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Server error, try again later", { position: "top-center", autoClose: 3000 });
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({ email: "", password: "", backend: "" });
    setuserdetails({ email: "", password: "" });
  };

  return (
    <div className={styles.modallayout}>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Login" : "Create Account"}</Modal.Title>
        </Modal.Header>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroupCustom}>
            <input
              type="email"
              placeholder="Email address"
              value={userdetails.email}
              onChange={(e) => setuserdetails({ ...userdetails, email: e.target.value })}
            />
            {errors.email && <div className={styles.errorMsg}>{errors.email}</div>}
          </div>

          <div className={`${styles.inputGroupCustom} ${styles.passwordGroup}`}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={userdetails.password}
              onChange={(e) => setuserdetails({ ...userdetails, password: e.target.value })}
            />
            <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <div className={styles.errorMsg}>{errors.password}</div>}
          </div>

          <div className={styles.buttonList}>
            <button type="submit" className={styles.signupBtn}>
              {isLogin ? "Login" : "Create Account"}
            </button>
            <button type="button" className={styles.loginBtn} onClick={switchMode}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>

        {/* Optional: Add to Cart button */}
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <button onClick={handleAddToCart} className={styles.signupBtn}>
            Add to Cart
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SignupModal;