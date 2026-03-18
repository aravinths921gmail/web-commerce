import React from "react";
import "../../styles/SupportPages.css";

export default function ContactUs() {

  return (
    <div className="support-page">

      <div className="support-header">
        <h1>Contact Us</h1>
        <p>
          Our support team is ready to help you with product information,
          installation assistance, and service requests.
        </p>
      </div>

      <div className="contact-grid">

        <div className="contact-card">
          <h3>Email Support</h3>
          <p>support@gymstore.com</p>
        </div>

        <div className="contact-card">
          <h3>Phone Support</h3>
          <p>+91 98765 43210</p>
        </div>

        <div className="contact-card">
          <h3>Business Hours</h3>
          <p>Mon – Sat : 9:00 AM – 6:00 PM</p>
        </div>

        <div className="contact-card">
          <h3>Head Office</h3>
          <p>Chennai, Tamil Nadu, India</p>
        </div>

      </div>

    </div>
  );
}