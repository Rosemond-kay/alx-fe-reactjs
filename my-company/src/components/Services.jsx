function Services() {
  const listItemStyle = {
    backgroundColor: "white",
    margin: "1rem 0",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderLeft: "4px solid #3498db",
  };

  return (
    <div
      style={{
        padding: "3rem 2rem",
        backgroundColor: "#f8f9fa",
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
        Our Services
      </h1>
      <ul
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          listStyle: "none",
          padding: "0",
        }}
      >
        <li style={listItemStyle}>Technology Consulting</li>
        <li style={listItemStyle}>Market Analysis</li>
        <li style={listItemStyle}>Product Development</li>
      </ul>
    </div>
  );
}

export default Services;
