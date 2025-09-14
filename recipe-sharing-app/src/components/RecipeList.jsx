// src/components/RecipeList.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";
import FavoriteButton from "./FavoriteButton";

const RecipeList = () => {
  const { filteredRecipes, searchTerm, initializeFilter, recipes } =
    useRecipeStore((state) => ({
      filteredRecipes: state.filteredRecipes,
      searchTerm: state.searchTerm,
      initializeFilter: state.initializeFilter,
      recipes: state.recipes,
    }));

  // Initialize filtered recipes on component mount
  useEffect(() => {
    if (filteredRecipes.length === 0 && recipes.length > 0 && !searchTerm) {
      initializeFilter();
    }
  }, [recipes, filteredRecipes.length, searchTerm, initializeFilter]);

  const containerStyle = {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "1rem",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#2c3e50",
  };

  const recipeGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
  };

  const recipeCardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "1.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative",
  };

  const titleStyle = {
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

  const ingredientsStyle = {
    marginBottom: "1rem",
  };

  const ingredientTagStyle = {
    display: "inline-block",
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.2rem 0.6rem",
    margin: "0.2rem",
    borderRadius: "12px",
    fontSize: "0.75rem",
  };

  const favoriteButtonContainerStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  };

  const cuisineBadgeStyle = {
    display: "inline-block",
    backgroundColor: "#e67e22",
    color: "white",
    padding: "0.2rem 0.8rem",
    borderRadius: "15px",
    fontSize: "0.75rem",
    marginBottom: "1rem",
  };

  const noResultsStyle = {
    textAlign: "center",
    color: "#666",
    fontSize: "1.1rem",
    marginTop: "3rem",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark
          key={index}
          style={{ backgroundColor: "#ffeb3b", padding: "0.1rem" }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const displayRecipes = filteredRecipes.length > 0 ? filteredRecipes : recipes;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        {searchTerm ? `Search Results for "${searchTerm}"` : "All Recipes"}
      </h2>

      {searchTerm && (
        <p style={{ textAlign: "center", color: "#666", marginBottom: "1rem" }}>
          Found {filteredRecipes.length} recipe
          {filteredRecipes.length !== 1 ? "s" : ""}
        </p>
      )}

      {displayRecipes.length === 0 ? (
        <div style={noResultsStyle}>
          <h3>No recipes found</h3>
          <p>
            {searchTerm
              ? `No recipes match your search for "${searchTerm}". Try different keywords or check your spelling.`
              : "No recipes available. Add your first recipe to get started!"}
          </p>
        </div>
      ) : (
        <div style={recipeGridStyle}>
          {displayRecipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.id}
              style={{ textDecoration: "none" }}
            >
              <div
                style={recipeCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                <div style={favoriteButtonContainerStyle}>
                  <FavoriteButton recipeId={recipe.id} size="small" />
                </div>

                <h3 style={titleStyle}>
                  {highlightText(recipe.title, searchTerm)}
                </h3>

                {recipe.cuisine && (
                  <span style={cuisineBadgeStyle}>{recipe.cuisine}</span>
                )}

                {recipe.description && (
                  <p style={descriptionStyle}>
                    {highlightText(recipe.description, searchTerm)}
                  </p>
                )}

                <div style={detailsStyle}>
                  <span>⏱️ Prep: {recipe.prepTime || "N/A"} min</span>
                  <span>🍳 Cook: {recipe.cookTime || "N/A"} min</span>
                  <span>📊 {recipe.difficulty || "Medium"}</span>
                </div>

                <div style={ingredientsStyle}>
                  <strong style={{ fontSize: "0.9rem", color: "#2c3e50" }}>
                    Ingredients:
                  </strong>
                  <div style={{ marginTop: "0.5rem" }}>
                    {recipe.ingredients
                      ?.slice(0, 4)
                      .map((ingredient, index) => (
                        <span key={index} style={ingredientTagStyle}>
                          {highlightText(ingredient, searchTerm)}
                        </span>
                      ))}
                    {recipe.ingredients?.length > 4 && (
                      <span style={ingredientTagStyle}>
                        +{recipe.ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
