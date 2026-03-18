import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Careers() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>

      <h1>Careers at FitCore</h1>

      <p>
        At FitCore, we are always looking for passionate individuals who want to
        make an impact in the fitness industry. Our team is built on creativity,
        collaboration, and a shared commitment to excellence. Whether your
        expertise lies in product development, design, marketing, or customer
        experience, we provide opportunities to grow and innovate.
      </p>

      <p>
        Working with FitCore means being part of a fast-growing brand that values
        fresh ideas and continuous improvement. We encourage our team members to
        take initiative, explore new approaches, and contribute to building a
        stronger fitness community.
      </p>

      <p>
        If you are driven, motivated, and passionate about fitness and technology,
        we invite you to join us and help shape the future of modern fitness
        equipment.
      </p>
    </div>
  );
}