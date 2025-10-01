import { useState } from "react";
import { Link } from "react-router-dom";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Check if title is empty
    if (!title.trim()) {
      newErrors.title = "Recipe title is required";
    }

    // Check if ingredients is empty and has at least 2 items
    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const ingredientsList = ingredients
        .split("\n")
        .filter((item) => item.trim() !== "");
      if (ingredientsList.length < 2) {
        newErrors.ingredients =
          "Please provide at least 2 ingredients (one per line)";
      }
    }

    // Check if steps is empty
    if (!steps.trim()) {
      newErrors.steps = "Preparation steps are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Recipe submitted:", { title, ingredients, steps });
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after successful submission
        setTitle("");
        setIngredients("");
        setSteps("");
        setErrors({});

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
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

      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Add New Recipe
      </h1>

      {/* Success Message */}
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Recipe added successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 md:p-8"
      >
        {/* Recipe Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Recipe Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: "" }));
              }
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Chocolate Chip Cookies"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label
            htmlFor="ingredients"
            className="block text-gray-700 font-semibold mb-2"
          >
            Ingredients <span className="text-red-500">*</span>
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={ingredients}
            onChange={(e) => {
              setIngredients(e.target.value);
              if (errors.ingredients) {
                setErrors((prev) => ({ ...prev, ingredients: "" }));
              }
            }}
            rows="6"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter each ingredient on a new line:&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Enter each ingredient on a new line (minimum 2 ingredients)
          </p>
        </div>

        {/* Preparation Steps */}
        <div className="mb-6">
          <label
            htmlFor="steps"
            className="block text-gray-700 font-semibold mb-2"
          >
            Preparation Steps <span className="text-red-500">*</span>
          </label>
          <textarea
            id="steps"
            name="steps"
            value={steps}
            onChange={(e) => {
              setSteps(e.target.value);
              if (errors.steps) {
                setErrors((prev) => ({ ...prev, steps: "" }));
              }
            }}
            rows="8"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
              errors.steps ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter each step on a new line:&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients&#10;3. Add wet ingredients"
          />
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Enter each step on a new line
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Recipe"
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setTitle("");
              setIngredients("");
              setSteps("");
              setErrors({});
            }}
            className="flex-1 sm:flex-initial bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipeForm;
