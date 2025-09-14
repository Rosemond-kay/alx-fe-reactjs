import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    margin: "0.5rem 0",
    border: "2px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        padding: "3rem 2rem",
        backgroundColor: "#ffffff",
        minHeight: "400px",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          color: "#2c3e50",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Contact Us
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: "120px" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "0.8rem 2rem",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
