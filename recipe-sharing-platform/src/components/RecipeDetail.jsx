import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Load the recipe data from data.json
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        const foundRecipe = data.find((recipe) => recipe.id === parseInt(id));
        setRecipe(foundRecipe);
      })
      .catch((error) => console.error("Error loading recipe:", error));
  }, [id]);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">Loading recipe...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {recipe.summary}
          </p>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Ingredients
        </h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <span className="text-green-600 mr-3 mt-1">•</span>
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Cooking Instructions
        </h2>
        <ol className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                {index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed pt-1">
                {instruction}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipeDetail;
