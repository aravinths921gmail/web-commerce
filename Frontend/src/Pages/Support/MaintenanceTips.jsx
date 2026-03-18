import React from "react";
import "../../styles/SupportPages.css";

export default function MaintenanceTips() {

  return (
    <div className="support-page">

      <div className="support-header">
        <h1>Maintenance Tips</h1>
        <p>
          Proper maintenance ensures longer equipment life and safe workouts.
        </p>
      </div>

      <section className="support-section">

        <h2>Daily Maintenance</h2>

        <ul>
          <li>Wipe down equipment after every use.</li>
          <li>Remove sweat and dust from handles and seats.</li>
          <li>Check for loose bolts or unusual noises.</li>
        </ul>

      </section>

      <section className="support-section">

        <h2>Weekly Maintenance</h2>

        <ul>
          <li>Lubricate treadmill belts.</li>
          <li>Inspect cables and pulleys.</li>
          <li>Check power cords for damage.</li>
        </ul>

      </section>

      <section className="support-section">

        <h2>Monthly Maintenance</h2>

        <ul>
          <li>Deep clean machines.</li>
          <li>Inspect moving parts.</li>
          <li>Check structural stability.</li>
        </ul>

      </section>

    </div>
  );
}