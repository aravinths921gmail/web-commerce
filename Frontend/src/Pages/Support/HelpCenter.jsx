import React from "react";
import "../../styles/SupportPages.css";

export default function HelpCenter() {

  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "Delivery usually takes 3-7 business days depending on your location."
    },
    {
      question: "Do you provide installation service?",
      answer: "Yes, installation services are available for selected equipment."
    },
    {
      question: "What is the warranty period?",
      answer: "Most equipment includes a 1-3 year manufacturer warranty."
    },
    {
      question: "Can I return a product?",
      answer: "Returns are accepted within 7 days if the product is unused."
    }
  ];

  return (
    <div className="support-page">

      <div className="support-header">
        <h1>Help Center</h1>
        <p>
          Find answers to commonly asked questions about orders,
          installation, warranty, and support.
        </p>
      </div>

      <div className="faq-container">

        {faqs.map((faq, index) => (
          <div key={index} className="faq-card">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}

      </div>

    </div>
  );
}