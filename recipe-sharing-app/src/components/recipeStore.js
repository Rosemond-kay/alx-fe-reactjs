// src/store/recipeStore.js
import create from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with eggs, cheese, and bacon",
      ingredients: [
        "spaghetti",
        "eggs",
        "bacon",
        "parmesan cheese",
        "black pepper",
      ],
      instructions:
        "1. Cook spaghetti. 2. Mix eggs and cheese. 3. Combine with bacon.",
      prepTime: 10,
      cookTime: 15,
    },
    {
      id: 2,
      title: "Chocolate Chip Cookies",
      description: "Delicious homemade cookies perfect for any occasion",
      ingredients: [
        "flour",
        "butter",
        "sugar",
        "chocolate chips",
        "eggs",
        "vanilla extract",
      ],
      instructions:
        "1. Mix dry ingredients. 2. Add wet ingredients. 3. Bake at 350°F.",
      prepTime: 15,
      cookTime: 12,
    },
    {
      id: 3,
      title: "Chicken Stir Fry",
      description: "Quick and healthy stir fry with vegetables",
      ingredients: [
        "chicken breast",
        "broccoli",
        "bell peppers",
        "soy sauce",
        "garlic",
        "ginger",
      ],
      instructions:
        "1. Cut chicken and vegetables. 2. Heat oil in pan. 3. Stir fry ingredients.",
      prepTime: 20,
      cookTime: 10,
    },
  ],

  // Search and filtering state
  searchTerm: "",
  filteredRecipes: [],

  // Actions for CRUD operations
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [
        ...state.recipes,
        { ...newRecipe, id: Date.now() },
      ];
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().filterRecipesByTerm(
          updatedRecipes,
          state.searchTerm
        ),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().filterRecipesByTerm(
          updatedRecipes,
          state.searchTerm
        ),
      };
    }),

  updateRecipe: (id, updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().filterRecipesByTerm(
          updatedRecipes,
          state.searchTerm
        ),
      };
    }),

  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: get().filterRecipesByTerm(recipes, state.searchTerm),
    })),

  // Search and filtering actions
  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: get().filterRecipesByTerm(state.recipes, term),
    })),

  // Helper function to filter recipes
  filterRecipesByTerm: (recipes, searchTerm) => {
    if (!searchTerm.trim()) {
      return recipes;
    }

    const term = searchTerm.toLowerCase();
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(term)
        )
    );
  },

  // Initialize filtered recipes
  initializeFilter: () =>
    set((state) => ({
      filteredRecipes: state.recipes,
    })),

  // Advanced filtering methods
  filterByIngredient: (ingredient) =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(ingredient.toLowerCase())
        )
      ),
    })),

  filterByPrepTime: (maxPrepTime) =>
    set((state) => ({
      filteredRecipes: state.recipes.filter(
        (recipe) => recipe.prepTime <= maxPrepTime
      ),
    })),

  filterByCookTime: (maxCookTime) =>
    set((state) => ({
      filteredRecipes: state.recipes.filter(
        (recipe) => recipe.cookTime <= maxCookTime
      ),
    })),

  // Reset filters
  clearFilters: () =>
    set((state) => ({
      searchTerm: "",
      filteredRecipes: state.recipes,
    })),
}));

export default useRecipeStore;
