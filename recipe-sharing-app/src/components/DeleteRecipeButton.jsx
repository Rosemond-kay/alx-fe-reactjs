import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ recipe, onCancel, onSave }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [formData, setFormData] = useState({
    title: recipe.title || "",
    description: recipe.description || "",
    ingredients: recipe.ingredients?.join(", ") || "",
    instructions: recipe.instructions || "",
    prepTime: recipe.prepTime || "",
    cookTime: recipe.cookTime || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Instructions are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedRecipe = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      ingredients: formData.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter(Boolean),
      instructions: formData.instructions.trim(),
      prepTime: formData.prepTime ? parseInt(formData.prepTime) : null,
      cookTime: formData.cookTime ? parseInt(formData.cookTime) : null,
    };

    updateRecipe(recipe.id, updatedRecipe);
    onSave();
  };

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    margin: "0.5rem 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box",
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: "#e74c3c",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
  };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "0.9rem",
    marginTop: "0.25rem",
  };

  const buttonStyle = {
    padding: "0.8rem 1.5rem",
    margin: "0.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Recipe Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={errors.title ? errorInputStyle : inputStyle}
            placeholder="Enter recipe title"
          />
          {errors.title && <div style={errorStyle}>{errors.title}</div>}
        </div>

        <div>
          <label style={labelStyle}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px" }}
            placeholder="Brief description of the recipe"
          />
        </div>

        <div>
          <label style={labelStyle}>Ingredients (comma-separated):</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            style={
              errors.ingredients
                ? { ...errorInputStyle, minHeight: "100px" }
                : { ...inputStyle, minHeight: "100px" }
            }
            placeholder="flour, sugar, eggs, butter"
          />
          {errors.ingredients && (
            <div style={errorStyle}>{errors.ingredients}</div>
          )}
        </div>

        <div>
          <label style={labelStyle}>Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            style={
              errors.instructions
                ? { ...errorInputStyle, minHeight: "120px" }
                : { ...inputStyle, minHeight: "120px" }
            }
            placeholder="Enter detailed cooking instructions"
          />
          {errors.instructions && (
            <div style={errorStyle}>{errors.instructions}</div>
          )}
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Prep Time (minutes):</label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              style={inputStyle}
              placeholder="15"
              min="0"
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Cook Time (minutes):</label>
            <input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              style={inputStyle}
              placeholder="30"
              min="0"
            />
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            type="submit"
            style={{
              ...buttonStyle,
              backgroundColor: "#27ae60",
              color: "white",
            }}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={onCancel}
            style={{
              ...buttonStyle,
              backgroundColor: "#95a5a6",
              color: "white",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// DeleteRecipeButton.jsx
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = ({ recipeId, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe? This action cannot be undone."
    );

    if (confirmed) {
      deleteRecipe(recipeId);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      } else {
        // Navigate to home page if no callback provided
        navigate("/");
      }
    }
  };

  const buttonStyle = {
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    backgroundColor: "#e74c3c",
    color: "white",
    transition: "background-color 0.3s",
  };

  return (
    <button
      onClick={handleDelete}
      style={buttonStyle}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
    >
      Delete Recipe
    </button>
  );
};
