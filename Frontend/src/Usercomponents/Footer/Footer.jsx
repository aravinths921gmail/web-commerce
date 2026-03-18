import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logoname from '../../assets/images/logobg.png';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Brand */}
        <div className={styles.column}>
          <Link to="/"><img className={styles.logo} src={logoname} alt="logo" /></Link>
          <p>Premium gym equipment for modern fitness spaces.</p>
          <div className={styles.socials}>
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

       <div className={styles.column}>
  <h4>Company</h4>
  <Link to="/about-us"><p>About Us</p></Link>
  <Link to="/our-mission"><p>Our Mission</p></Link>
  <Link to="/careers"><p>Careers</p></Link>
</div>

<div className={styles.column}>
  <h4>Policies</h4>
  <Link to="/privacy-policy"><p>Privacy Policy</p></Link>
  <Link to="/terms-conditions"><p>Terms & Conditions</p></Link>
  <Link to="/shipping-policy"><p>Shipping Policy</p></Link>
  <Link to="/warranty-policy"><p>Warranty Policy</p></Link>
</div>

        {/* Contact */}
        <div className={styles.column}>
          <h4>Contact</h4>
          <p>📍 India</p>
          <p>📞 +91 9999999999</p>
          <p>✉ support@fitcore.com</p>
        </div>

      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} FitCore. All rights reserved.
      </div>
    </footer>
  );
}