// src/components/Search.jsx
import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  // State management
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!username.trim()) {
      return;
    }

    // Reset states
    setLoading(true);
    setError(false);
    setUserData(null);

    try {
      // Fetch user data from GitHub API
      const data = await fetchUserData(username.trim());
      setUserData(data);
    } catch (err) {
      setError(true);
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Conditional Rendering Based on State */}
      {loading && <div className="loading-message">Loading...</div>}

      {error && (
        <div className="error-message">Looks like we cant find the user</div>
      )}

      {userData && !loading && !error && (
        <div className="user-info">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            className="user-avatar"
          />
          <h2>{userData.name || userData.login}</h2>
          <p className="username">@{userData.login}</p>
          {userData.bio && <p className="user-bio">{userData.bio}</p>}
          <div className="user-stats">
            <span>Followers: {userData.followers}</span>
            <span>Following: {userData.following}</span>
            <span>Public Repos: {userData.public_repos}</span>
          </div>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
