function About() {
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
        About Us
      </h1>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          fontSize: "1.1rem",
          lineHeight: "1.8",
        }}
      >
        <p>
          Our company has been providing top-notch services since 1990. We
          specialize in various fields including technology, marketing, and
          consultancy.
        </p>
      </div>
    </div>
  );
}

export default About;
