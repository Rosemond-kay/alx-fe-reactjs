// src/components/SearchBar.jsx
import React from "react";
import useRecipeStore from "../store/recipeStore";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, clearFilters } = useRecipeStore(
    (state) => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
      clearFilters: state.clearFilters,
    })
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    clearFilters();
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    margin: "1rem 0 2rem 0",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    flex: 1,
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "25px",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const inputFocusStyle = {
    borderColor: "#3498db",
  };

  const buttonStyle = {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
  };

  const iconStyle = {
    marginRight: "0.5rem",
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <span style={iconStyle}>🔍</span>
        <input
          type="text"
          placeholder="Search recipes by name, description, or ingredients..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#3498db")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </div>
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
