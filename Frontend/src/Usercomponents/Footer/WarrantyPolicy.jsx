import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function WarrantyPolicy() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>

      <h1>Warranty Policy</h1>

      <p>
        FitCore products are built with quality and durability in mind. We offer
        a limited warranty on our equipment to protect against manufacturing
        defects and ensure customer satisfaction.
      </p>

      <p>
        The warranty covers structural issues and defects under normal usage
        conditions. However, it does not cover damage caused by misuse, improper
        installation, accidents, or regular wear and tear over time.
      </p>

      <p>
        To claim warranty service, customers must provide proof of purchase.
        Our support team will guide you through the process and ensure a smooth
        resolution as quickly as possible.
      </p>
    </div>
  );
}