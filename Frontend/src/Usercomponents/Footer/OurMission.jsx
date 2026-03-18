import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function OurMission() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>

      <h1>Our Mission</h1>

      <p>
        Our mission at FitCore is to empower individuals to take control of their
        health and fitness through high-quality, reliable equipment. We aim to
        remove barriers that prevent people from starting or continuing their
        fitness journey by offering products that are accessible, durable, and
        easy to use in any environment.
      </p>

      <p>
        We strive to inspire consistency and confidence in every user. Fitness is
        not about short-term results, but about building habits that last a
        lifetime. By providing dependable tools, we help our customers stay
        committed to their routines and achieve sustainable progress.
      </p>

      <p>
        Beyond products, our mission extends to creating a community that values
        growth, discipline, and well-being. FitCore stands for more than equipment
        — it represents a mindset focused on improvement and strength.
      </p>
    </div>
  );
}