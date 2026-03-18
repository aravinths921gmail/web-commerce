import React, { useState } from "react";
import "./WorkoutGuide.css";

export default function WorkoutGuide() {
  const [openPart, setOpenPart] = useState(null);

  const bodyParts = [
    {
      name: "Chest",
      exercises: ["Bench Press", "Push Ups", "Chest Fly"],
      equipment: ["Dumbbells", "Barbell", "Bench"]
    },
    {
      name: "Back",
      exercises: ["Pull Ups", "Deadlift", "Rows"],
      equipment: ["Pull-up Bar", "Dumbbells", "Barbell"]
    },
    {
      name: "Legs",
      exercises: ["Squats", "Lunges", "Leg Press"],
      equipment: ["Squat Rack", "Leg Press Machine", "Dumbbells"]
    },
    {
      name: "Arms",
      exercises: ["Bicep Curl", "Tricep Pushdown", "Hammer Curl"],
      equipment: ["Dumbbells", "Cable Machine", "Resistance Bands"]
    },
    {
      name: "Shoulders",
      exercises: ["Overhead Press", "Lateral Raise", "Front Raise"],
      equipment: ["Dumbbells", "Barbell", "Cable Machine"]
    }
  ];

  return (
    <div className="workout-wrapper">
      <h2>💪 Workout Guide</h2>
      <p className="subtext">
        Click a body part to see exercises and equipment
      </p>

      {bodyParts.map((part, index) => (
        <div key={index} className="body-part-card">
          <div
            className="body-part-header"
            onClick={() => setOpenPart(openPart === index ? null : index)}
          >
            {part.name}
            <span className={`arrow ${openPart === index ? "open" : ""}`}>
              &#9654;
            </span>
          </div>

          <div className={`exercise-list ${openPart === index ? "active" : ""}`}>
            {part.exercises.map((ex, i) => (
              <div key={i} className="exercise-card">
                <strong>{ex}</strong>
                <p className="equipment">Equipment: {part.equipment.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}