import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";

function App() {
  const appStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  };

  const mainContentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  return (
    <Router>
      <div className="App" style={appStyle}>
        <Navigation />

        <main style={mainContentStyle}>
          <Routes>
            {/* Home Route - All Recipes with Search and Filters */}
            <Route
              path="/"
              element={
                <>
                  <SearchBar />
                  <FilterPanel />
                  <AddRecipeForm />
                  <RecipeList />
                </>
              }
            />

            {/* Recipe Details Route */}
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />

            {/* Favorites Route */}
            <Route path="/favorites" element={<FavoritesList />} />

            {/* Recommendations Route */}
            <Route path="/recommendations" element={<RecommendationsList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
