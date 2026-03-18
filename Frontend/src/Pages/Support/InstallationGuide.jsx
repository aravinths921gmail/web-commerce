import React from "react";
import "../../styles/SupportPages.css";

export default function InstallationGuide() {
  return (
    <div className="support-page">

      <div className="support-header">
        <h1>Installation Guide</h1>
        <p>
          Follow these instructions to safely install your gym equipment and
          ensure optimal performance.
        </p>
      </div>

      <section className="support-section">
        <h2>General Installation Steps</h2>

        <ul>
          <li>Unpack the equipment carefully and verify all parts.</li>
          <li>Place the machine on a flat and stable surface.</li>
          <li>Follow the instruction manual included with your product.</li>
          <li>Use the recommended tools and safety gear.</li>
          <li>Ensure all bolts and screws are tightened properly.</li>
        </ul>
      </section>

      <section className="support-section">
        <h2>Professional Installation</h2>

        <p>
          For commercial gyms or complex machines such as treadmills,
          elliptical trainers, and multi-station equipment, we recommend
          professional installation by our certified technicians.
        </p>
      </section>

      <section className="support-section">
        <h2>Safety Tips</h2>

        <ul>
          <li>Keep equipment away from moisture.</li>
          <li>Ensure proper electrical grounding.</li>
          <li>Do not install near unstable surfaces.</li>
          <li>Keep children away during installation.</li>
        </ul>
      </section>

    </div>
  );
}