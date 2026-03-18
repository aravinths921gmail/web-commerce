import React from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";

export default function Blog3() {
  return (
    <div className={styles.blogPage}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>
      <h1>Nutrition Tips for Fitness Enthusiasts</h1>

      <h2>The Role of Nutrition in Fitness</h2>
      <p>
        Nutrition is the foundation of fitness. Whether your goal is weight loss,
        muscle gain, or improved performance, the food you consume fuels your body
        and determines the effectiveness of your workouts. Neglecting nutrition can
        limit results and affect overall health.
      </p>

      <h2>Understanding Macronutrients</h2>
      <p>
        A balanced diet includes proteins, carbohydrates, and fats. Proteins help
        repair and build muscles, carbs provide energy for training, and fats support
        hormone production and joint health. Understanding how to balance these
        macronutrients is crucial for any fitness enthusiast.
      </p>

      <h2>Pre-Workout Meals</h2>
      <p>
        Eating before exercise ensures you have enough energy for optimal performance.
        Opt for complex carbohydrates with moderate protein. Examples include oats
        with yogurt, whole-grain toast with peanut butter, or a banana with a handful
        of nuts. Avoid heavy or greasy meals that may cause discomfort during training.
      </p>

      <h2>Post-Workout Recovery</h2>
      <p>
        Nutrition after training is equally important. Consuming protein and carbs
        post-workout aids muscle recovery and replenishes energy stores. Quick options
        include a protein shake with fruit, chicken with rice, or eggs with vegetables.
        Proper recovery prevents fatigue and supports continuous progress.
      </p>

      <h2>Hydration and Performance</h2>
      <p>
        Staying hydrated is often overlooked but essential. Water supports digestion,
        nutrient transport, and temperature regulation. Dehydration reduces strength,
        endurance, and focus, so aim to drink water throughout the day and during
        workouts.
      </p>

      <h2>Supplements – When Needed</h2>
      <p>
        Supplements can complement your diet, but they should never replace whole
        foods. Options like whey protein, creatine, or multivitamins can help if
        your dietary intake is insufficient. Consult a professional before starting
        any supplement regimen to ensure safety and effectiveness.
      </p>

      <h2>Consistency Over Perfection</h2>
      <p>
        Consistency is the key to success in nutrition and fitness. Focus on building
        sustainable habits rather than drastic diets. Regular meals, balanced macronutrients,
        proper hydration, and occasional treats create a realistic and maintainable plan.
      </p>

      <h2>Final Thoughts</h2>
      <p>
        Fitness and nutrition go hand in hand. Prioritize nutrient-dense foods,
        balance your meals, hydrate, and maintain consistency. Over time, these
        habits will enhance performance, recovery, and overall well-being.
      </p>
    </div>
  );
}