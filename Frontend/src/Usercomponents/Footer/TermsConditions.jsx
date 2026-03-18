import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function TermsConditions() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>

      <h1>Terms & Conditions</h1>

      <p>
        By accessing and using FitCore’s website, you agree to comply with the
        terms and conditions outlined here. These terms are designed to ensure a
        safe, fair, and transparent experience for all users interacting with our
        platform.
      </p>

      <p>
        All products should be used according to the provided instructions. Any
        misuse, improper handling, or unauthorized modifications may result in
        damage or void warranties. FitCore is not responsible for injuries caused
        by incorrect usage of equipment.
      </p>

      <p>
        We reserve the right to update pricing, policies, and product availability
        at any time without prior notice. Continued use of the website implies
        acceptance of these terms.
      </p>
    </div>
  );
}