// src/services/githubService.js
import axios from "axios";

// GitHub API base URL
const GITHUB_API_BASE_URL = "https://api.github.com";

// Create axios instance with base configuration
const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

// Add GitHub token if available in environment variables
if (import.meta.env.VITE_GITHUB_TOKEN) {
  githubAPI.defaults.headers.Authorization = `token ${
    import.meta.env.VITE_GITHUB_TOKEN
  }`;
}

/**
 * Fetch user data from GitHub API (original function)
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data object
 * @throws {Error} When user is not found or API request fails
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
 * Advanced search for GitHub users with multiple criteria
 * @param {Object} searchParams - Search parameters object
 * @param {string} searchParams.username - Username to search for
 * @param {string} searchParams.location - User location
 * @param {string} searchParams.minRepos - Minimum number of repositories
 * @param {string} searchParams.language - Programming language
 * @param {number} searchParams.page - Page number for pagination (default: 1)
 * @param {number} searchParams.perPage - Results per page (default: 30, max: 100)
 * @returns {Promise<Object>} Search results object with items array and pagination info
 * @throws {Error} When search fails
 */
export const searchUsers = async ({
  username = "",
  location = "",
  minRepos = "",
  language = "",
  page = 1,
  perPage = 30,
}) => {
  try {
    // Build search query
    const queryParts = [];

    // Add username search
    if (username.trim()) {
      // Search in username and full name
      queryParts.push(`${username} in:login`);
    }

    // Add location filter
    if (location.trim()) {
      queryParts.push(`location:"${location}"`);
    }

    // Add minimum repositories filter
    if (minRepos && !isNaN(minRepos)) {
      queryParts.push(`repos:>=${minRepos}`);
    }

    // Add programming language filter
    if (language.trim()) {
      queryParts.push(`language:"${language}"`);
    }

    // If no specific criteria provided, default to searching all users
    const query = queryParts.length > 0 ? queryParts.join(" ") : "type:user";

    // Make API request
    const response = await githubAPI.get("/search/users", {
      params: {
        q: query,
        page: page,
        per_page: Math.min(perPage, 100), // GitHub API max is 100
        sort: "followers", // Sort by followers for better relevance
        order: "desc",
      },
    });

    // Fetch additional details for each user (location, public_repos, followers)
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const detailedUser = await githubAPI.get(`/users/${user.login}`);
          return {
            ...user,
            location: detailedUser.data.location,
            public_repos: detailedUser.data.public_repos,
            followers: detailedUser.data.followers,
            following: detailedUser.data.following,
            bio: detailedUser.data.bio,
            blog: detailedUser.data.blog,
            company: detailedUser.data.company,
            created_at: detailedUser.data.created_at,
            updated_at: detailedUser.data.updated_at,
          };
        } catch (error) {
          // If detailed fetch fails, return basic user info
          console.warn(`Failed to fetch details for user ${user.login}`);
          return user;
        }
      })
    );

    return {
      ...response.data,
      items: usersWithDetails,
    };
  } catch (error) {
    console.error("Error searching users:", error);

    if (error.response) {
      switch (error.response.status) {
        case 403:
          throw new Error("API rate limit exceeded. Please try again later.");
        case 422:
          throw new Error(
            "Invalid search parameters. Please check your input."
          );
        case 503:
          throw new Error("GitHub API is temporarily unavailable.");
        default:
          throw new Error(`Search failed: ${error.response.status}`);
      }
    }

    throw new Error("Failed to search users. Please check your connection.");
  }
};

/**
 * Get user repositories
 * @param {string} username - GitHub username
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Results per page
 * @returns {Promise<Array>} Array of repository objects
 * @throws {Error} When fetching repositories fails
 */
export const getUserRepositories = async (username, page = 1, perPage = 30) => {
  try {
    const response = await githubAPI.get(`/users/${username}/repos`, {
      params: {
        page,
        per_page: Math.min(perPage, 100),
        sort: "updated",
        direction: "desc",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    throw new Error("Failed to fetch user repositories");
  }
};

/**
 * Get user followers
 * @param {string} username - GitHub username
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Results per page
 * @returns {Promise<Array>} Array of follower objects
 * @throws {Error} When fetching followers fails
 */
export const getUserFollowers = async (username, page = 1, perPage = 30) => {
  try {
    const response = await githubAPI.get(`/users/${username}/followers`, {
      params: {
        page,
        per_page: Math.min(perPage, 100),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user followers:", error);
    throw new Error("Failed to fetch user followers");
  }
};

/**
 * Get user following
 * @param {string} username - GitHub username
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Results per page
 * @returns {Promise<Array>} Array of following objects
 * @throws {Error} When fetching following fails
 */
export const getUserFollowing = async (username, page = 1, perPage = 30) => {
  try {
    const response = await githubAPI.get(`/users/${username}/following`, {
      params: {
        page,
        per_page: Math.min(perPage, 100),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user following:", error);
    throw new Error("Failed to fetch user following");
  }
};

/**
 * Search repositories with advanced criteria
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.query - Repository search query
 * @param {string} searchParams.language - Programming language
 * @param {number} searchParams.minStars - Minimum stars
 * @param {number} searchParams.page - Page number
 * @returns {Promise<Object>} Repository search results
 */
export const searchRepositories = async ({
  query = "",
  language = "",
  minStars = "",
  page = 1,
  perPage = 30,
}) => {
  try {
    const queryParts = [];

    if (query.trim()) {
      queryParts.push(query);
    }

    if (language.trim()) {
      queryParts.push(`language:"${language}"`);
    }

    if (minStars && !isNaN(minStars)) {
      queryParts.push(`stars:>=${minStars}`);
    }

    const searchQuery =
      queryParts.length > 0 ? queryParts.join(" ") : "stars:>0";

    const response = await githubAPI.get("/search/repositories", {
      params: {
        q: searchQuery,
        page,
        per_page: Math.min(perPage, 100),
        sort: "stars",
        order: "desc",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching repositories:", error);
    throw new Error("Failed to search repositories");
  }
};
