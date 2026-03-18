import React, { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import "./Calorietracker.css";

// 50+ FOOD DATABASE
const FOOD_DB = [
  { name: "Rice (1 cup)", calories: 130 },
  { name: "Chapati (1)", calories: 120 },
  { name: "Idli (1)", calories: 60 },
  { name: "Dosa (1)", calories: 150 },
  { name: "Chicken Breast (100g)", calories: 165 },
  { name: "Egg (1)", calories: 70 },
  { name: "Paneer (100g)", calories: 265 },
  { name: "Milk (1 glass)", calories: 150 },
  { name: "Banana (1)", calories: 105 },
  { name: "Apple (1)", calories: 95 },
  { name: "Almonds (10)", calories: 70 },
  { name: "Peanut Butter (1 tbsp)", calories: 90 },
  { name: "Oats (1 bowl)", calories: 150 },
  { name: "Curd (1 cup)", calories: 98 },
  { name: "Fish (100g)", calories: 206 },
  { name: "Mutton (100g)", calories: 294 },
  { name: "Protein Shake", calories: 200 },
  { name: "Upma (1 bowl)", calories: 180 },
  { name: "Poha (1 bowl)", calories: 250 },
  { name: "Sambar (1 bowl)", calories: 120 },
  { name: "Vegetable Curry", calories: 150 },
  { name: "Burger", calories: 354 },
  { name: "Pizza Slice", calories: 285 },
  { name: "French Fries", calories: 312 },
  { name: "Chocolate", calories: 208 },
  // 
];

export default function CalorieTracker({ products = [] }) {
  const { addToCart } = useContext(CartContext);

  const [bodyType, setBodyType] = useState("ectomorph");
  const [goalType, setGoalType] = useState("maintain");
  const [weight, setWeight] = useState(60);
  const [targetWeight, setTargetWeight] = useState(65);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [entries, setEntries] = useState([]);

  // CALORIE LOGIC
  const getBaseCalories = () => {
    let base = weight * 30;

    if (bodyType === "ectomorph") base += 200;
    if (bodyType === "endomorph") base -= 200;

    if (goalType === "weight_loss") base -= 400;
    if (goalType === "muscle_gain") base += 400;
    if (goalType === "weight_gain") base += 500;

    return Math.round(base);
  };

  const goalCalories = getBaseCalories();

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);
  const remaining = goalCalories - totalCalories;

  // TIME TO GOAL
  const weightDiff = Math.abs(targetWeight - weight);
  const weeklyChange = goalType === "weight_loss" ? 0.5 : 0.4;
  const weeks = weightDiff / weeklyChange;
  const months = (weeks / 4).toFixed(1);

  // SEARCH
  const handleSearch = (val) => {
    setQuery(val);
    const filtered = FOOD_DB.filter(f =>
      f.name.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 6));
  };

  const addFood = (item) => {
    setEntries([...entries, { ...item, id: Date.now() }]);
    setQuery("");
    setSuggestions([]);
  };

  // PRODUCT LOGIC
  const getRecommendations = () => {
    if (!products.length) return [];

    if (goalType === "weight_loss" || totalCalories > goalCalories) {
      return products.filter(p =>
        p.category?.name?.toLowerCase().includes("cardio")
      ).slice(0, 3);
    }

    if (goalType === "muscle_gain" || goalType === "weight_gain") {
      return products.filter(p =>
        p.category?.name?.toLowerCase().includes("strength")
      ).slice(0, 3);
    }

    return [];
  };

  const recommendations = getRecommendations();

  return (
    <div className="tracker-wrapper">
      <div className="tracker-card">

        <h2>🔥 Advanced Calorie Planner</h2>

        {/* USER SETUP */}
        <div className="setup-grid">
          <select value={bodyType} onChange={e => setBodyType(e.target.value)}>
            <option value="ectomorph">Ectomorph</option>
            <option value="mesomorph">Mesomorph</option>
            <option value="endomorph">Endomorph</option>
          </select>

          <select value={goalType} onChange={e => setGoalType(e.target.value)}>
            <option value="weight_loss">Weight Loss</option>
            <option value="maintain">Maintain</option>
            <option value="weight_gain">Weight Gain</option>
            <option value="muscle_gain">Muscle Gain</option>
          </select>


          {/* USER WEIGHT SETUP */}
          <div className="weights-grid">
            <div className="weight-input">
              <label htmlFor="currentWeight">Current Weight (kg)</label>
              <input
                id="currentWeight"
                type="number"
                placeholder="Current Weight"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>

            <div className="weight-input">
              <label htmlFor="targetWeight">Target Weight (kg)</label>
              <input
                id="targetWeight"
                type="number"
                placeholder="Target Weight"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats">
          <p>🎯 Daily Goal: {goalCalories} kcal</p>
          <p>🔥 Consumed: {totalCalories} kcal</p>
          <p>⚡ Remaining: {remaining} kcal</p>
          <p>📅 Estimated Time: {months} months</p>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="suggestions">
          {suggestions.map(item => (
            <div key={item.name} onClick={() => addFood(item)}>
              {item.name} ({item.calories} kcal)
            </div>
          ))}
        </div>

        {/* LIST */}
        <ul>
          {entries.map(e => (
            <li key={e.id}>{e.name} - {e.calories}</li>
          ))}
        </ul>

        {/* INSIGHTS */}
        {remaining < 0 && <p className="warning">⚠️ Overeating → Do cardio</p>}
        {remaining > 500 && <p>💡 You need more calories</p>}

        {/* PRODUCTS */}
        <h3>Recommended Equipment</h3>
        <div className="products">
          {recommendations.map(p => (
            <div key={p._id} className="mini-card">
              <img src={`http://localhost:4000/uploads/${encodeURIComponent(p.images?.[0])}`} alt="" />
              <p>{p.Name}</p>
              <button onClick={() => addToCart(p)}>Add</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}