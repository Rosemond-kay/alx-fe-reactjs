// src/App.jsx
import { useState } from "react";
import SearchForm from "./components/SearchForm";
import UserList from "./components/UserList";
import { searchUsers } from "./services/githubService";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const data = await searchUsers(searchTerm);
      setUsers(data.items || []);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Find GitHub users and explore their profiles</p>
      </header>

      <main className="app-main">
        <SearchForm onSearch={handleSearch} />

        {hasSearched && (
          <UserList users={users} loading={loading} error={error} />
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React and GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
