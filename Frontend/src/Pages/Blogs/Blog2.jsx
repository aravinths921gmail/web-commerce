import React from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";

export default function Blog2() {
  return (
    <div className={styles.blogPage}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>
      <h1>How to Build Strength at Home</h1>

      <h2>Understanding Home Workouts</h2>
      <p>
        Many people assume building strength requires a gym membership or heavy
        equipment, but home workouts can be equally effective. The key is to
        focus on compound movements, progressive overload, and proper nutrition.
        With the right mindset and a few essential tools, you can achieve
        impressive results from the comfort of your home.
      </p>

      <h2>Setting Up Your Home Gym</h2>
      <p>
        A few versatile tools can transform your living space into a strength
        training zone. Dumbbells, kettlebells, resistance bands, a pull-up bar,
        and a yoga mat cover most exercise needs. You don’t need fancy machines;
        simplicity allows you to focus on form, consistency, and progress.
      </p>

      <h2>Full-Body Exercises</h2>
      <p>
        To maximize strength gains, prioritize full-body movements like squats,
        deadlifts, push-ups, and rows. These exercises engage multiple muscle
        groups, improve coordination, and burn more calories than isolated
        exercises. Beginners should start with bodyweight variations and gradually
        introduce resistance.
      </p>

      <h2>Progressive Overload and Tracking</h2>
      <p>
        Strength growth happens when you gradually challenge your muscles over
        time. Track your exercises, reps, and weights to ensure consistent
        progress. Aim to slightly increase either weight or repetitions each week.
        This method builds strength safely and effectively.
      </p>

      <h2>Rest and Recovery</h2>
      <p>
        Muscles need time to recover after a workout. Overtraining can lead to
        fatigue, injuries, and stalled progress. Schedule rest days and focus
        on sleep, stretching, and light mobility exercises on off days.
      </p>

      <h2>Nutrition for Strength</h2>
      <p>
        Nutrition fuels your workouts and recovery. Consume protein-rich foods
        such as lean meats, eggs, or plant-based alternatives. Carbohydrates provide
        energy, while healthy fats support hormone balance. Hydration is also
        crucial for performance and recovery.
      </p>

      <h2>Consistency Over Intensity</h2>
      <p>
        The most important factor for strength development is consistency. Stick
        to a structured plan, focus on gradual improvements, and remain patient.
        Combining smart workouts, proper nutrition, and rest ensures you see
        long-term results without risking injury.
      </p>

      <h2>Conclusion</h2>
      <p>
        Building strength at home is entirely possible with dedication, planning,
        and the right equipment. Focus on compound movements, track progress,
        prioritize recovery, and maintain a balanced diet. Over time, your
        strength, confidence, and overall fitness will dramatically improve.
      </p>
    </div>
  );
}