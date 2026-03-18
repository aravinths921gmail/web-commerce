import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function AboutUs() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>

      <h1>About FitCore</h1>

      <p>
        FitCore was created with a simple but powerful vision — to make premium
        fitness equipment accessible to everyone. Whether you are a beginner
        starting your journey or an experienced athlete building a home gym,
        we aim to provide products that combine durability, performance, and style.
        Our focus is not just selling equipment, but supporting a lifestyle built
        on consistency, discipline, and long-term health.
      </p>

      <p>
        Over time, fitness has evolved from being a hobby into a necessity for
        many individuals. At FitCore, we understand this shift and continuously
        work to design and deliver equipment that fits modern living spaces while
        maintaining professional-grade quality. From compact dumbbells to full
        training setups, every product is crafted with attention to detail.
      </p>

      <p>
        We believe that fitness is personal. Everyone has different goals,
        challenges, and routines. That’s why FitCore is committed to being a
        reliable partner in your journey, helping you stay consistent, motivated,
        and confident every step of the way.
      </p>
    </div>
  );
}