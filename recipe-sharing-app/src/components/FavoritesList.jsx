// src/components/FavoritesList.jsx
import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";
import FavoriteButton from "./FavoriteButton";

const FavoritesList = () => {
  const { recipes, favorites, clearFavorites } = useRecipeStore((state) => ({
    recipes: state.recipes,
    favorites: state.favorites,
    clearFavorites: state.clearFavorites,
  }));

  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  const containerStyle = {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    borderBottom: "2px solid #e74c3c",
    paddingBottom: "1rem",
  };

  const titleStyle = {
    color: "#2c3e50",
    fontSize: "2rem",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const clearButtonStyle = {
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "1.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
  };

  const recipeTitleStyle = {
    color: "#2c3e50",
    marginBottom: "0.5rem",
    fontSize: "1.3rem",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const descriptionStyle = {
    color: "#666",
    marginBottom: "1rem",
    fontSize: "0.9rem",
    lineHeight: "1.4",
  };

  const detailsStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    fontSize: "0.8rem",
    color: "#888",
  };

  const tagsStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.3rem",
    marginBottom: "1rem",
  };

  const tagStyle = {
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontSize: "0.75rem",
  };

  const favoriteButtonContainerStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "3rem",
    color: "#666",
  };

  const emptyIconStyle = {
    fontSize: "3rem",
    marginBottom: "1rem",
  };

  const handleClearFavorites = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      clearFavorites();
    }
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>❤️ My Favorites</h2>
        </div>

        <div style={emptyStateStyle}>
          <div style={emptyIconStyle}>💔</div>
          <h3>No favorites yet!</h3>
          <p>Start exploring recipes and add some to your favorites.</p>
          <p>Click the heart icon on any recipe to add it to your favorites.</p>

          <Link
            to="/"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.8rem 1.5rem",
              backgroundColor: "#3498db",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              transition: "background-color 0.3s",
            }}
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>❤️ My Favorites ({favoriteRecipes.length})</h2>
        {favoriteRecipes.length > 0 && (
          <button
            onClick={handleClearFavorites}
            style={clearButtonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7f8c8d")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#95a5a6")}
          >
            Clear All
          </button>
        )}
      </div>

      <div style={gridStyle}>
        {favoriteRecipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            style={{ textDecoration: "none" }}
          >
            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              }}
            >
              <div style={favoriteButtonContainerStyle}>
                <FavoriteButton recipeId={recipe.id} size="small" />
              </div>

              <h3 style={recipeTitleStyle}>{recipe.title}</h3>

              {recipe.description && (
                <p style={descriptionStyle}>{recipe.description}</p>
              )}

              <div style={detailsStyle}>
                <span>⏱️ Prep: {recipe.prepTime || "N/A"} min</span>
                <span>🍳 Cook: {recipe.cookTime || "N/A"} min</span>
              </div>

              {recipe.cuisine && (
                <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                  <strong>Cuisine:</strong> {recipe.cuisine}
                </div>
              )}

              {recipe.tags && recipe.tags.length > 0 && (
                <div style={tagsStyle}>
                  {recipe.tags.map((tag, index) => (
                    <span key={index} style={tagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
