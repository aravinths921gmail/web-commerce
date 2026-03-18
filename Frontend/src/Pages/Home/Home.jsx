import React from "react";
import Slider from "../../Usercomponents/Sliders/Slider";
import Productfetching from "../../Usercomponents/Products/Productfetching";
import CategorySection from "../../Usercomponents/CategorySection/CategorySection";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  // Sample blog data (replace with real data or fetch dynamically)
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Gym Equipment for Beginners",
      excerpt:
        "Discover the essential equipment every beginner should have to start their fitness journey.",
      link: "/blog/1",
    },
    {
      id: 2,
      title: "How to Build Strength at Home",
      excerpt:
        "Learn the techniques and equipment you need to effectively build strength from your home gym.",
      link: "/blog/2",
    },
    {
      id: 3,
      title: "Nutrition Tips for Fitness Enthusiasts",
      excerpt:
        "Maximize your performance with the right diet and supplements for your training.",
      link: "/blog/3",
    },
  ];

  return (
    <>
      <Slider />

      {/* BRAND HERO */}
      <section className={styles.hero}>
        <h1 className={styles.brandTitle}>FITCORE</h1>
        <p className={styles.brandSubtitle}>
          Premium Gym Equipment for Strength, Fitness and Performance
        </p>
        <div className={styles.heroButtons}>
          <Link to="/bmi">
            <button className={styles.bmiBtn}>Check BMI</button>
          </Link>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <Productfetching />
      </section>

      {/* CATEGORY */}
      <section className={styles.section}>
        <CategorySection />
      </section>

      {/* BMI SECTION */}
      <section className={styles.bmiSection}>
        <h2>Find The Perfect Equipment For Your Body</h2>
        <p>
          Calculate your BMI and discover which weights and equipment suit your
          fitness journey.
        </p>
        <Link to="/bmi">
          <button className={styles.bmiCta}>Calculate Your BMI</button>
        </Link>
      </section>

      {/* FEATURES */}
      <section className={styles.featureSection}>
        <div className={styles.featureCard}>
          <h3>🏋️ Premium Equipment</h3>
          <p>High quality dumbbells, barbells and gym gear.</p>
        </div>

        <div className={styles.featureCard}>
          <h3>🚚 Fast Delivery</h3>
          <p>Get your equipment delivered across India.</p>
        </div>

        <div className={styles.featureCard}>
          <h3>💪 Build Strength</h3>
          <p>Equip your home gym and train like a pro.</p>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Blog</h2>
        <div className={styles.blogContainer}>
          {blogPosts.map((post) => (
            <div key={post.id} className={styles.blogCard}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link to={post.link}>
                <button className={styles.blogReadMore}>Read More</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}