// src/components/RecommendationsList.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";
import FavoriteButton from "./FavoriteButton";

const RecommendationsList = () => {
  const {
    recommendations,
    favorites,
    generateRecommendations,
    getRecipeStats,
  } = useRecipeStore((state) => ({
    recommendations: state.recommendations,
    favorites: state.favorites,
    generateRecommendations: state.generateRecommendations,
    getRecipeStats: state.getRecipeStats,
  }));

  // Generate recommendations on component mount and when favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites.length, generateRecommendations]);

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
    marginBottom: "1rem",
    borderBottom: "2px solid #9b59b6",
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

  const refreshButtonStyle = {
    backgroundColor: "#9b59b6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  };

  const subtitleStyle = {
    color: "#666",
    fontSize: "1rem",
    marginBottom: "1.5rem",
    textAlign: "center",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "1.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
    cursor: "pointer",
  };

  const recipeTitleStyle = {
    color: "#2c3e50",
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const descriptionStyle = {
    color: "#666",
    marginBottom: "1rem",
    fontSize: "0.9rem",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const detailsStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    fontSize: "0.8rem",
    color: "#888",
  };

  const cuisineBadgeStyle = {
    display: "inline-block",
    backgroundColor: "#9b59b6",
    color: "white",
    padding: "0.2rem 0.8rem",
    borderRadius: "15px",
    fontSize: "0.75rem",
    marginBottom: "1rem",
  };

  const reasonStyle = {
    fontSize: "0.8rem",
    color: "#27ae60",
    fontStyle: "italic",
    marginBottom: "1rem",
    backgroundColor: "#f8fff8",
    padding: "0.5rem",
    borderRadius: "4px",
    borderLeft: "3px solid #27ae60",
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

  const getRecommendationReason = (recipe) => {
    const stats = getRecipeStats();
    const favoriteCuisines = Object.keys(stats.mostCommonCuisine || {});

    if (favorites.length === 0) {
      return "Popular recipe to get you started!";
    }

    if (favoriteCuisines.includes(recipe.cuisine)) {
      return `You seem to love ${recipe.cuisine} cuisine!`;
    }

    if (recipe.cookTime <= 20) {
      return "Quick and easy recipe for busy days!";
    }

    if (recipe.tags?.includes("healthy")) {
      return "A healthy choice for your collection!";
    }

    return "We think you'll love this recipe!";
  };

  const handleRefreshRecommendations = () => {
    generateRecommendations();
  };

  if (recommendations.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>✨ Recommended for You</h2>
          <button
            onClick={handleRefreshRecommendations}
            style={refreshButtonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#8e44ad")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#9b59b6")}
          >
            🔄 Refresh
          </button>
        </div>

        <div style={emptyStateStyle}>
          <div style={emptyIconStyle}>🤔</div>
          <h3>No recommendations available</h3>
          <p>
            Add some recipes to your favorites to get personalized
            recommendations!
          </p>

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
        <h2 style={titleStyle}>✨ Recommended for You</h2>
        <button
          onClick={handleRefreshRecommendations}
          style={refreshButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#8e44ad")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#9b59b6")}
        >
          🔄 Refresh
        </button>
      </div>

      <p style={subtitleStyle}>
        {favorites.length > 0
          ? `Based on your ${favorites.length} favorite recipe${
              favorites.length !== 1 ? "s" : ""
            }`
          : "Popular recipes you might enjoy"}
      </p>

      <div style={gridStyle}>
        {recommendations.map((recipe) => (
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

              {recipe.cuisine && (
                <span style={cuisineBadgeStyle}>{recipe.cuisine}</span>
              )}

              {recipe.description && (
                <p style={descriptionStyle}>{recipe.description}</p>
              )}

              <div style={reasonStyle}>
                💡 {getRecommendationReason(recipe)}
              </div>

              <div style={detailsStyle}>
                <span>⏱️ {recipe.prepTime || 0} min prep</span>
                <span>🍳 {recipe.cookTime || 0} min cook</span>
                <span>📊 {recipe.difficulty || "Medium"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#666",
        }}
      >
        💡 Tip: Add more recipes to favorites for better recommendations!
      </div>
    </div>
  );
};

export default RecommendationsList;
