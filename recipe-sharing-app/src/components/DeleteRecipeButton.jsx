import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = ({ recipeId, onDeleteSuccess }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe? This action cannot be undone."
    );

    if (confirmed) {
      deleteRecipe(recipeId);
      if (onDeleteSuccess) {
        onDeleteSuccess();
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

export default DeleteRecipeButton;
