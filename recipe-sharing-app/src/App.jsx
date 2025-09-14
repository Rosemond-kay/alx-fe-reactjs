import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";

function App() {
  const appStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#2c3e50",
  };

  return (
    <Router>
      <div className="App" style={appStyle}>
        <header>
          <h1 style={headerStyle}>Recipe Sharing App</h1>
        </header>

        <Routes>
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
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
