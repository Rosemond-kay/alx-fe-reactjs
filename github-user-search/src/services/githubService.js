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
 * Fetch user data from GitHub API
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

// Additional utility functions for future use
export const searchUsers = async (query) => {
  try {
    const response = await githubAPI.get(`/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to search users");
  }
};

export const getUserRepositories = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user repositories");
  }
};
