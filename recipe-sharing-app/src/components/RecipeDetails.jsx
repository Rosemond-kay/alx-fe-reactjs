import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === parseInt(recipeId))
  );

  if (!recipe) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate("/")} style={buttonStyle}>
          Back to Recipes
        </button>
      </div>
    );
  }

  const containerStyle = {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    color: "#2c3e50",
    marginBottom: "1rem",
    fontSize: "2.5rem",
  };

  const sectionStyle = {
    marginBottom: "2rem",
  };

  const buttonStyle = {
    padding: "0.8rem 1.5rem",
    margin: "0.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteSuccess = () => {
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      {!isEditing ? (
        <>
          <h1 style={titleStyle}>{recipe.title}</h1>

          {recipe.description && (
            <div style={sectionStyle}>
              <h3>Description:</h3>
              <p>{recipe.description}</p>
            </div>
          )}

          <div style={sectionStyle}>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div style={sectionStyle}>
            <h3>Instructions:</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{recipe.instructions}</p>
          </div>

          {recipe.prepTime && (
            <div style={sectionStyle}>
              <h3>Prep Time:</h3>
              <p>{recipe.prepTime} minutes</p>
            </div>
          )}

          {recipe.cookTime && (
            <div style={sectionStyle}>
              <h3>Cook Time:</h3>
              <p>{recipe.cookTime} minutes</p>
            </div>
          )}

          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={handleEditToggle}
              style={{
                ...buttonStyle,
                backgroundColor: "#3498db",
                color: "white",
              }}
            >
              Edit Recipe
            </button>

            <DeleteRecipeButton
              recipeId={recipe.id}
              onDeleteSuccess={handleDeleteSuccess}
            />

            <button
              onClick={() => navigate("/")}
              style={{
                ...buttonStyle,
                backgroundColor: "#95a5a6",
                color: "white",
              }}
            >
              Back to Recipes
            </button>
          </div>
        </>
      ) : (
        <EditRecipeForm
          recipe={recipe}
          onCancel={handleEditToggle}
          onSave={handleEditToggle}
        />
      )}
    </div>
  );
};

export default RecipeDetails;
