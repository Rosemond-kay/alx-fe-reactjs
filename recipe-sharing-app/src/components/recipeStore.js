// src/store/recipeStore.js
import create from "zustand";
import { persist } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [
        {
          id: 1,
          title: "Spaghetti Carbonara",
          description:
            "A classic Italian pasta dish with eggs, cheese, and bacon",
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
          cuisine: "Italian",
          difficulty: "Medium",
          tags: ["pasta", "italian", "quick"],
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
          cuisine: "American",
          difficulty: "Easy",
          tags: ["dessert", "baking", "sweet"],
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
          cuisine: "Asian",
          difficulty: "Easy",
          tags: ["healthy", "quick", "chicken"],
        },
        {
          id: 4,
          title: "Caesar Salad",
          description: "Classic Caesar salad with homemade dressing",
          ingredients: [
            "romaine lettuce",
            "parmesan cheese",
            "croutons",
            "caesar dressing",
            "anchovies",
          ],
          instructions: "1. Chop lettuce. 2. Make dressing. 3. Toss and serve.",
          prepTime: 15,
          cookTime: 0,
          cuisine: "Italian",
          difficulty: "Easy",
          tags: ["salad", "healthy", "vegetarian"],
        },
        {
          id: 5,
          title: "Beef Tacos",
          description: "Flavorful beef tacos with fresh toppings",
          ingredients: [
            "ground beef",
            "taco shells",
            "lettuce",
            "tomatoes",
            "cheese",
            "sour cream",
          ],
          instructions:
            "1. Cook beef with spices. 2. Warm taco shells. 3. Assemble tacos.",
          prepTime: 10,
          cookTime: 15,
          cuisine: "Mexican",
          difficulty: "Easy",
          tags: ["mexican", "beef", "quick"],
        },
      ],

      // Search and filtering state
      searchTerm: "",
      filteredRecipes: [],

      // Favorites state
      favorites: [],

      // Recommendations state
      recommendations: [],

      // User preferences for better recommendations
      userPreferences: {
        preferredCuisines: [],
        preferredDifficulty: "",
        preferredCookTime: null,
        dietaryRestrictions: [],
      },

      // CRUD operations for recipes
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
          const updatedRecipes = state.recipes.filter(
            (recipe) => recipe.id !== id
          );
          // Also remove from favorites if it exists
          const updatedFavorites = state.favorites.filter(
            (favId) => favId !== id
          );
          return {
            recipes: updatedRecipes,
            favorites: updatedFavorites,
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
            ) ||
            recipe.tags?.some((tag) => tag.toLowerCase().includes(term))
        );
      },

      initializeFilter: () =>
        set((state) => ({
          filteredRecipes: state.recipes,
        })),

      clearFilters: () =>
        set((state) => ({
          searchTerm: "",
          filteredRecipes: state.recipes,
        })),

      // FAVORITES ACTIONS
      addFavorite: (recipeId) =>
        set((state) => {
          if (!state.favorites.includes(recipeId)) {
            const newFavorites = [...state.favorites, recipeId];
            // Regenerate recommendations when favorites change
            setTimeout(() => get().generateRecommendations(), 100);
            return { favorites: newFavorites };
          }
          return state;
        }),

      removeFavorite: (recipeId) =>
        set((state) => {
          const newFavorites = state.favorites.filter((id) => id !== recipeId);
          // Regenerate recommendations when favorites change
          setTimeout(() => get().generateRecommendations(), 100);
          return { favorites: newFavorites };
        }),

      toggleFavorite: (recipeId) =>
        set((state) => {
          const isFavorite = state.favorites.includes(recipeId);
          if (isFavorite) {
            get().removeFavorite(recipeId);
          } else {
            get().addFavorite(recipeId);
          }
          return state;
        }),

      // Check if recipe is in favorites
      isFavorite: (recipeId) => {
        const state = get();
        return state.favorites.includes(recipeId);
      },

      // Get favorite recipes
      getFavoriteRecipes: () => {
        const state = get();
        return state.favorites
          .map((id) => state.recipes.find((recipe) => recipe.id === id))
          .filter(Boolean);
      },

      // RECOMMENDATIONS ACTIONS
      generateRecommendations: () =>
        set((state) => {
          const favoriteRecipes = state.favorites
            .map((id) => state.recipes.find((recipe) => recipe.id === id))
            .filter(Boolean);

          if (favoriteRecipes.length === 0) {
            // If no favorites, recommend popular recipes (random selection)
            const shuffled = [...state.recipes].sort(() => 0.5 - Math.random());
            return { recommendations: shuffled.slice(0, 3) };
          }

          // Extract preferences from favorite recipes
          const favoriteCuisines = [
            ...new Set(favoriteRecipes.map((recipe) => recipe.cuisine)),
          ];
          const favoriteTags = [
            ...new Set(favoriteRecipes.flatMap((recipe) => recipe.tags || [])),
          ];
          const avgCookTime =
            favoriteRecipes.reduce(
              (sum, recipe) => sum + (recipe.cookTime || 0),
              0
            ) / favoriteRecipes.length;

          // Find similar recipes based on preferences
          const similarRecipes = state.recipes.filter((recipe) => {
            // Don't recommend recipes already in favorites
            if (state.favorites.includes(recipe.id)) return false;

            let score = 0;

            // Score based on cuisine match
            if (favoriteCuisines.includes(recipe.cuisine)) score += 3;

            // Score based on tag similarity
            const commonTags =
              recipe.tags?.filter((tag) => favoriteTags.includes(tag)) || [];
            score += commonTags.length * 2;

            // Score based on similar cooking time (within 10 minutes)
            if (Math.abs((recipe.cookTime || 0) - avgCookTime) <= 10)
              score += 1;

            // Score based on similar prep time
            const avgPrepTime =
              favoriteRecipes.reduce(
                (sum, recipe) => sum + (recipe.prepTime || 0),
                0
              ) / favoriteRecipes.length;
            if (Math.abs((recipe.prepTime || 0) - avgPrepTime) <= 10)
              score += 1;

            return score > 0;
          });

          // Sort by score and return top recommendations
          const scored = similarRecipes.map((recipe) => {
            let score = 0;
            if (favoriteCuisines.includes(recipe.cuisine)) score += 3;
            const commonTags =
              recipe.tags?.filter((tag) => favoriteTags.includes(tag)) || [];
            score += commonTags.length * 2;
            if (Math.abs((recipe.cookTime || 0) - avgCookTime) <= 10)
              score += 1;
            return { recipe, score };
          });

          const topRecommendations = scored
            .sort((a, b) => b.score - a.score)
            .slice(0, 4)
            .map((item) => item.recipe);

          return { recommendations: topRecommendations };
        }),

      // Update user preferences
      updateUserPreferences: (preferences) =>
        set((state) => ({
          userPreferences: { ...state.userPreferences, ...preferences },
        })),

      // Get recommendations based on specific criteria
      getRecommendationsByIngredient: (ingredient) => {
        const state = get();
        return state.recipes.filter(
          (recipe) =>
            recipe.ingredients.some((ing) =>
              ing.toLowerCase().includes(ingredient.toLowerCase())
            ) && !state.favorites.includes(recipe.id)
        );
      },

      // Clear all favorites (for testing purposes)
      clearFavorites: () => set({ favorites: [] }),

      // Get recipe statistics
      getRecipeStats: () => {
        const state = get();
        const favoriteRecipes = get().getFavoriteRecipes();

        return {
          totalRecipes: state.recipes.length,
          totalFavorites: state.favorites.length,
          mostCommonCuisine:
            favoriteRecipes.length > 0
              ? favoriteRecipes.reduce((acc, recipe) => {
                  acc[recipe.cuisine] = (acc[recipe.cuisine] || 0) + 1;
                  return acc;
                }, {})
              : {},
          avgCookTime:
            favoriteRecipes.length > 0
              ? favoriteRecipes.reduce(
                  (sum, recipe) => sum + (recipe.cookTime || 0),
                  0
                ) / favoriteRecipes.length
              : 0,
        };
      },
    }),
    {
      name: "recipe-storage", // Name for localStorage
      partialize: (state) => ({
        favorites: state.favorites,
        userPreferences: state.userPreferences,
      }),
    }
  )
);

export default useRecipeStore;
