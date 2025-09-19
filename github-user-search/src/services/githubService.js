// src/services/githubService.js
import axios from "axios";

// GitHub API configuration
const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Create axios instance with base configuration
const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-User-Search-App",
  },
});

// Add authentication token if available
if (GITHUB_TOKEN) {
  githubAPI.defaults.headers.Authorization = `token ${GITHUB_TOKEN}`;
}

/**
 * Original fetchUserData function for backward compatibility
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data object
 */
export const fetchUserData = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to fetch user data");
  }
};

/**
 * Advanced search function for GitHub users
 * @param {Object} searchParams - Search parameters object
 * @param {string} searchParams.username - Username to search for
 * @param {string} searchParams.location - Location to filter by
 * @param {string} searchParams.minRepos - Minimum number of repositories
 * @param {string} searchParams.language - Programming language to filter by
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} perPage - Number of results per page (default: 30, max: 100)
 * @returns {Promise<Object>} Search results object with items array and metadata
 */
export const searchUsersAdvanced = async (
  searchParams,
  page = 1,
  perPage = 30
) => {
  try {
    // Build the search query
    const queryParts = [];

    // Add username search
    if (searchParams.username && searchParams.username.trim()) {
      queryParts.push(searchParams.username.trim());
    }

    // Add location filter
    if (searchParams.location && searchParams.location.trim()) {
      queryParts.push(`location:"${searchParams.location.trim()}"`);
    }

    // Add minimum repositories filter
    if (searchParams.minRepos && parseInt(searchParams.minRepos) > 0) {
      queryParts.push(`repos:>=${parseInt(searchParams.minRepos)}`);
    }

    // Add language filter
    if (searchParams.language && searchParams.language.trim()) {
      queryParts.push(`language:"${searchParams.language.trim()}"`);
    }

    // Join all query parts
    const query = queryParts.join(" ");

    if (!query) {
      throw new Error("At least one search parameter is required");
    }

    // Make the API request
    const response = await githubAPI.get("/search/users", {
      params: {
        q: query,
        page: page,
        per_page: Math.min(perPage, 100), // GitHub API max is 100
        sort: "repositories", // Sort by repository count
        order: "desc",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Advanced search error:", error);

    if (error.response) {
      switch (error.response.status) {
        case 422:
          throw new Error(
            "Invalid search parameters. Please check your input."
          );
        case 403:
          throw new Error("API rate limit exceeded. Please try again later.");
        case 503:
          throw new Error(
            "GitHub service is temporarily unavailable. Please try again later."
          );
        default:
          throw new Error(
            `Search failed: ${error.response.data?.message || "Unknown error"}`
          );
      }
    }

    throw new Error(
      "Network error. Please check your connection and try again."
    );
  }
};

/**
 * Get detailed user information including additional fields
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} Detailed user data
 */
export const getUserDetails = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw new Error("Failed to fetch user details");
  }
};

/**
 * Get user repositories
 * @param {string} username - GitHub username
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Results per page (default: 30)
 * @returns {Promise<Array>} Array of repository objects
 */
export const getUserRepositories = async (username, page = 1, perPage = 30) => {
  try {
    const response = await githubAPI.get(`/users/${username}/repos`, {
      params: {
        page: page,
        per_page: Math.min(perPage, 100),
        sort: "updated",
        type: "all",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    throw new Error("Failed to fetch user repositories");
  }
};

/**
 * Search repositories by various criteria
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.query - Repository search query
 * @param {string} searchParams.language - Programming language
 * @param {string} searchParams.user - Username to filter by
 * @param {number} page - Page number
 * @returns {Promise<Object>} Repository search results
 */
export const searchRepositories = async (searchParams, page = 1) => {
  try {
    const queryParts = [];

    if (searchParams.query) {
      queryParts.push(searchParams.query);
    }

    if (searchParams.language) {
      queryParts.push(`language:"${searchParams.language}"`);
    }

    if (searchParams.user) {
      queryParts.push(`user:${searchParams.user}`);
    }

    const query = queryParts.join(" ");

    const response = await githubAPI.get("/search/repositories", {
      params: {
        q: query,
        page: page,
        per_page: 30,
        sort: "stars",
        order: "desc",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Repository search error:", error);
    throw new Error("Failed to search repositories");
  }
};

/**
 * Get GitHub API rate limit status
 * @returns {Promise<Object>} Rate limit information
 */
export const getRateLimit = async () => {
  try {
    const response = await githubAPI.get("/rate_limit");
    return response.data;
  } catch (error) {
    console.error("Error fetching rate limit:", error);
    throw new Error("Failed to fetch rate limit information");
  }
};

/**
 * Build search query string from parameters (utility function)
 * @param {Object} params - Search parameters
 * @returns {string} Formatted search query
 */
export const buildSearchQuery = (params) => {
  const queryParts = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value && value.toString().trim()) {
      switch (key) {
        case "username":
          queryParts.push(value.trim());
          break;
        case "location":
          queryParts.push(`location:"${value.trim()}"`);
          break;
        case "minRepos":
          if (parseInt(value) > 0) {
            queryParts.push(`repos:>=${parseInt(value)}`);
          }
          break;
        case "language":
          queryParts.push(`language:"${value.trim()}"`);
          break;
        case "followers":
          if (parseInt(value) > 0) {
            queryParts.push(`followers:>=${parseInt(value)}`);
          }
          break;
        case "created":
          queryParts.push(`created:${value}`);
          break;
      }
    }
  });

  return queryParts.join(" ");
};

// Export default for backward compatibility
export default {
  fetchUserData,
  searchUsersAdvanced,
  getUserDetails,
  getUserRepositories,
  searchRepositories,
  getRateLimit,
  buildSearchQuery,
};
