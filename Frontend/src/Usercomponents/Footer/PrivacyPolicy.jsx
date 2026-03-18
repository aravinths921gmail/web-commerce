import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>

      <h1>Privacy Policy</h1>

      <p>
        At FitCore, your privacy is extremely important to us. We are committed to
        protecting your personal information and ensuring that your data is handled
        responsibly and transparently. Any information collected through our
        website is used solely to improve your experience, process orders, and
        provide customer support.
      </p>

      <p>
        We collect basic details such as name, contact information, and shipping
        address to fulfill your orders efficiently. This information is stored
        securely and is never sold or shared with third parties without your
        consent, except when required to complete essential services such as
        payment processing or delivery.
      </p>

      <p>
        By using our platform, you agree to our privacy practices. We continuously
        update our systems to ensure your data remains safe and protected at all
        times.
      </p>
    </div>
  );
}