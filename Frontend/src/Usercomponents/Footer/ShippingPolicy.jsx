import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function ShippingPolicy() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>

      <h1>Shipping Policy</h1>

      <p>
        FitCore provides reliable shipping services across India, ensuring your
        fitness equipment reaches you safely and on time. We partner with trusted
        logistics providers to maintain delivery quality and efficiency.
      </p>

      <p>
        Standard delivery typically takes between 5 to 7 business days, depending
        on your location. Once your order is dispatched, you will receive tracking
        details so you can monitor your shipment in real time.
      </p>

      <p>
        Shipping costs may vary based on order size, weight, and destination.
        We aim to keep delivery charges reasonable while ensuring secure packaging
        and handling of all products.
      </p>
    </div>
  );
}