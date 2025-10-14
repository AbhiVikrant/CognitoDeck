import React, { useState } from "react";

function Modal({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>FAQ Section</h1>
      <div style={styles.faqContainer}>
        {faqs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>No FAQs available</p>
        ) : (
          faqs.map((faq, index) => (
            <div key={index} style={styles.faqItem}>
              <div style={styles.questionRow} onClick={() => toggleFAQ(index)}>
                <h3 style={styles.question}>{faq.question}</h3>
                <span style={styles.toggleIcon}>
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <p style={styles.answer}>{faq.answer}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },
  faqContainer: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
  },
  faqItem: {
    borderBottom: "1px solid #eee",
    padding: "10px 0",
  },
  questionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  question: {
    margin: 0,
    fontSize: "18px",
  },
  toggleIcon: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
  },
  answer: {
    marginTop: "10px",
    color: "#555",
    lineHeight: 1.5,
  },
};

export default Modal;
