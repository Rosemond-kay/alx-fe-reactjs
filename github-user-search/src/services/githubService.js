// src/services/githubService.js
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";
const API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

// Create axios instance with base configuration
const githubAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(API_KEY && { Authorization: `token ${API_KEY}` }),
  },
});

// Search for GitHub users
export const searchUsers = async (username) => {
  try {
    const response = await githubAPI.get(`/search/users?q=${username}`);
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

// Get detailed user information
export const getUserDetails = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Get user repositories
export const getUserRepositories = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    throw error;
  }
};
