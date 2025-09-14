import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish",
      ingredients: ["spaghetti", "eggs", "bacon", "parmesan cheese"],
      instructions:
        "1. Cook spaghetti. 2. Mix eggs and cheese. 3. Combine with bacon.",
      prepTime: 10,
      cookTime: 15,
    },
    {
      id: 2,
      title: "Chocolate Chip Cookies",
      description: "Delicious homemade cookies",
      ingredients: ["flour", "butter", "sugar", "chocolate chips", "eggs"],
      instructions:
        "1. Mix dry ingredients. 2. Add wet ingredients. 3. Bake at 350°F.",
      prepTime: 15,
      cookTime: 12,
    },
  ]);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="App">
        <h1>Recipe Sharing App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm onAddRecipe={addRecipe} />
                <RecipeList recipes={recipes} />
              </>
            }
          />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
