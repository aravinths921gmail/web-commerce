import React, { useState } from "react";
import "./BMIPage.css";

export default function BMIPage() {

const [height,setHeight] = useState("");
const [weight,setWeight] = useState("");
const [bmi,setBmi] = useState(null);
const [recommend,setRecommend] = useState("");

const calculateBMI = () => {

if(!height || !weight){
alert("Please enter height and weight");
return;
}

const h = height / 100;
const result = (weight / (h * h)).toFixed(1);

setBmi(result);

if(result < 18.5){
setRecommend(`
You are underweight.

Recommended Equipment:
• 2kg - 5kg Dumbbells
• Resistance Bands
• Adjustable Bench
• Skipping Rope
`);
}

else if(result >= 18.5 && result < 25){
setRecommend(`
Healthy BMI range.

Recommended Equipment:
• 5kg - 12kg Dumbbells
• Kettlebells
• Barbell Set
• Adjustable Bench
• Pull-up Bar
`);
}

else if(result >= 25 && result < 30){
setRecommend(`
Slightly overweight.

Recommended Equipment:
• 5kg - 8kg Dumbbells
• Resistance Bands
• Skipping Rope
• Exercise Bike
• Treadmill
`);
}

else{
setRecommend(`
Higher BMI.

Recommended Equipment:
• Resistance Bands
• Yoga Mat
• Light Dumbbells (2kg - 4kg)
• Treadmill
• Exercise Bike
`);
}

};

return(

<div className="bmi-page">

<div className="bmi-card">

<h2 className="bmi-title">BMI Calculator</h2>

<input
type="number"
placeholder="Height (cm)"
value={height}
onChange={(e)=>setHeight(e.target.value)}
/>

<input
type="number"
placeholder="Weight (kg)"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
/>

<button onClick={calculateBMI}>
Calculate BMI
</button>

{bmi && (
<div className="bmi-result">

<h3>Your BMI: {bmi}</h3>

<p style={{whiteSpace:"pre-line"}}>
{recommend}
</p>

</div>
)}

</div>

</div>

)

}