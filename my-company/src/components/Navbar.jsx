import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    backgroundColor: "#2c3e50",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/about" style={linkStyle}>
        About
      </Link>
      <Link to="/services" style={linkStyle}>
        Services
      </Link>
      <Link to="/contact" style={linkStyle}>
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
