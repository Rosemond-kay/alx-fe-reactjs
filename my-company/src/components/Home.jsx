function Home() {
  return (
    <div
      style={{
        padding: "3rem 2rem",
        textAlign: "center",
        backgroundColor: "#ecf0f1",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", color: "#2c3e50", marginBottom: "1rem" }}
      >
        Welcome to Our Company
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#34495e",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        We are dedicated to delivering excellence in all our services.
      </p>
    </div>
  );
}

export default Home;
